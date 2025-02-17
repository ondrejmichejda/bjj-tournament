import {inject} from '@angular/core';
import {
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    Firestore,
    getDoc,
    orderBy,
    updateDoc
} from "@angular/fire/firestore";
import {delay, from, map, Observable, throwError, zip} from "rxjs";
import {query} from "firebase/firestore";

/**
 * Service for managing Firebase Firestore entities. Provides CRUD operations,
 * as well as transformation capabilities on the entity data.
 *
 * @template T The entity type, which extends `FirebaseEntity`.
 */
export class FirebaseEntityService<T extends FirebaseEntity> {

    protected firestore = inject(Firestore);

    /**
     * Represents the name of a collection.
     *
     * This variable is used to store the name of a specific collection.
     * Ensure the value assigned is a string and adheres to the naming conventions
     * relevant to its purpose.
     */
    protected readonly collectionName: string = '';
    /**
     * Simulated latency.
     *
     * @type {number}
     */
    protected latency: number = 300;
    /**
     * A function used to transform an input of type T into a desired output format.
     *
     * The transform function takes a single parameter, `item`, of type T
     * and returns an object or any custom transformed structure.
     *
     * This property is optional and, when not defined, no transformation is applied.
     *
     * @template T
     * @param {T} item - The input item to be transformed.
     * @returns {Object|*} The transformed output.
     */
    private readonly transformFn?: (item: T) => {};

    /**
     * Constructs an instance with the specified collection name and an optional transformation function.
     *
     * @param {string} collection - The name of the collection.
     * @param {(item: T) => {}=} transformFn - An optional function to transform items in the collection.
     */
    constructor(collection: string,
                transformFn?: (item: T) => {}) {
        this.collectionName = collection;
        this.transformFn = transformFn;
    }

    /**
     * Loads items from a Firestore collection and returns an observable of the data.
     * The items are ordered by the 'created' field in ascending order.
     *
     * @return {Observable<T[]>} An observable emitting an array of items from the Firestore collection,
     *                           delayed by the specified latency.
     */
    loadItems(): Observable<T[]> {
        const collectionRef = collection(this.firestore, this.collectionName);
        const collectionQuery = query(collectionRef, orderBy('created', 'asc'));
        return (collectionData(collectionQuery, {idField: 'id'}) as Observable<T[]>).pipe(
            delay(this.latency)
        );
    }

    /**
     * Loads an item from a specified document reference and returns an observable.
     *
     * @param {string} id - The ID of the document to be retrieved.
     * @return {Observable<T>} An observable that emits the retrieved item, including its data and ID.
     */
    loadItem(id: string): Observable<T> {
        return from(getDoc(this.docRef(id))).pipe(
            delay(this.latency),
            map(doc => {
                return {
                    ...<T>doc.data(),
                    id: doc.id
                }
            })
        );
    }

    /**
     * Creates a new item in the Firestore collection.
     *
     * @param {T} item The item to be added to the Firestore collection. Can be of any type.
     * @return {Observable<string>} An observable that emits the ID of the created item.
     */
    createItem(item: T): Observable<string> {
        const items = collection(this.firestore, this.collectionName);

        const data = this.transformFn ? this.transformFn(item) : item;
        return from(addDoc(items, {...data})).pipe(
            delay(this.latency),
            map(doc => doc.id),
        );
    }

    /**
     * Updates an existing item in the data store.
     *
     * @param item The item to be updated. Must contain an `id` property.
     * @return An Observable that emits the `id` of the updated item upon success.
     *         Throws an error if the provided item does not have an `id`.
     */
    updateItem(item: T): Observable<string> {
        if (item.id === undefined) {
            return throwError(() => new Error('Item must have an id to be updated.'));
        }

        const data = this.transformFn ? this.transformFn(item) : item;
        return from(updateDoc(this.docRef(item.id), {...data})).pipe(
            map(() => item.id!)
        )
    }

    /**
     * Deletes an item from the database based on the provided identifier.
     *
     * @param {string} id - The unique identifier of the item to be deleted.
     * @return {Observable<string>} An Observable that emits the ID of the deleted item upon successful deletion.
     */
    deleteItem(id: string): Observable<string> {
        return from(deleteDoc(this.docRef(id))).pipe(
            delay(this.latency),
            map(() => id)
        )
    }

    /**
     * Deletes multiple items identified by their IDs in bulk.
     *
     * @param {string[]} ids - An array of IDs representing the items to be deleted.
     * @return {Observable<boolean>} An Observable that emits `true` when all deletions complete successfully.
     */
    public deleteBulk(ids: string[]): Observable<boolean> {
        const del$ = ids.map(id => this.deleteItem(id));
        return zip(del$).pipe(
            map(() => true)
        )
    }

    /**
     * Retrieves a DocumentReference object for a specific document in a Firestore collection.
     *
     * @param {string} id - The unique identifier of the document within the collection.
     */
    private docRef = (id: string): any =>
        doc(this.firestore, `${this.collectionName}/${id}`);
}

/**
 * Represents a base entity for Firebase interactions.
 *
 * This class provides common properties for entities stored in Firebase, including a unique identifier,
 * creation timestamp, and synchronization status.
 *
 * Note: The constructor is protected, which means this class is intended to be extended by other classes.
 *
 * Properties:
 * - `id`: A string identifier of the entity. Defaults to 'not set'.
 * - `uid`: A unique numeric identifier, generated when an instance is created.
 * - `created`: A timestamp representing the creation time of the entity, generated when an instance is created.
 * - `pending`: A boolean indicating whether the entity is unsynchronized between client and server. Defaults to true.
 */
export class FirebaseEntity {
    /**
     * A string variable representing an identifier.
     * It is initialized with a default value of 'not set'.
     * The variable is intended to hold a unique identification value
     * that can be updated as needed in the application.
     *
     * This ID is set by Firestore
     */
    id: string = 'not set';

    /**
     * Unique identifier for a specific entity or resource.
     *
     * This variable is used to distinguish an entity or resource with a distinct numeric value.
     * It is required to identify item during backend synchronization.
     *
     * @type {number}
     */
    uid: number;

    /**
     * Represents the timestamp when the entity or resource was created.
     * The value is a number, typically expressed in milliseconds elapsed since the Unix epoch (January 1, 1970
     * 00:00:00 UTC).
     */
    created: number;

    /**
     * True until client and server are synchronized
     */
    pending: boolean = true;

    /**
     * Protected constructor that initializes a unique identifier and a creation timestamp
     * for an instance of the class. This constructor is meant to be used internally by
     * the class or its subclasses.
     */
    protected constructor() {
        this.uid = new Date().getTime() + Math.floor(Math.random() * 1000);
        this.created = new Date().getTime();
    }
}