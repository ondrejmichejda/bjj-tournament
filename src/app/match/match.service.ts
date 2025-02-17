import {inject, Injectable} from '@angular/core';
import {Match} from './match';
import {FirebaseEntityService} from "../base/firebase-entity.service";
import {Store} from "@ngrx/store";
import {combineLatest, delay, from, map, Observable, take, throwError} from "rxjs";
import {selectAllCompetitors} from "../state/competitor/competitor.selectors";
import {MatchFactory} from "./match-factory";
import {addDoc, collection, doc} from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class MatchService extends FirebaseEntityService<Match> {

    private store = inject(Store);

    constructor() {
        super('matches');
    }

    calculate(): Observable<Match[]> {
        return this.store.select(selectAllCompetitors)
            .pipe(
                take(1),
                map(competitors => {
                    const match = MatchFactory.create(competitors[0], competitors[1]);
                    return [match];
                })
            );
    }

    override loadItems(): Observable<Match[]> {
        return combineLatest([super.loadItems(), this.store.select(selectAllCompetitors)]).pipe(
            map(([matches, competitors]) => {
                return matches.map(match => {
                    return {
                        ...match,
                        competitorA: competitors.find(c => c.id === match.competitorA?.id),
                        competitorB: competitors.find(c => c.id === match.competitorB?.id)
                    }
                })
            })
        )
    }

    /**
     * Creates a new match item in the specified Firestore collection.
     *
     * @param {Match} item - The match object containing details such as competitors, unique identifier, and created*/
    override createItem(item: Match): Observable<string> {
        const items = collection(this.firestore, this.collectionName);
        const competitorARef = doc(this.firestore, `competitors/${item.competitorA?.id}`);
        const competitorBRef = doc(this.firestore, `competitors/${item.competitorB?.id}`);

        const data = {
            competitorA: competitorARef,
            competitorB: competitorBRef,
            uid: item.uid,
            created: item.created
        }
        return from(addDoc(items, {...data})).pipe(
            delay(this.latency),
            map(doc => doc.id),
        );
    }

    /**
     * Updates a specific item. This method is overridden and will throw an error
     * indicating that the update operation is not supported for this item.
     *
     * @param {Match} item - The item to be updated.
     * @return {Observable<string>} An observable that throws an error indicating the operation is not supported.
     */
    override updateItem(item: Match): Observable<string> {
        return throwError(() => new Error('Do not use update of this item.'));
    }
}
