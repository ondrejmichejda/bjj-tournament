import {inject, Injectable} from '@angular/core';
import {BeltColor, Competitor} from './competitor';
import {catchError, delay, from, map, Observable, of} from 'rxjs';
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
import {CompetitorFactory} from "./competitor-factory";
import {query} from 'firebase/firestore';

@Injectable({
    providedIn: 'root'
})
export class CompetitorService {

    private firestore = inject(Firestore);
    private latency = 0;

    static getRandomCompetitor(): Competitor {
        return CompetitorFactory.create(this.generateRandomName(), this.getRandomWeight(), this.getRandomBelt());
    }

    private static generateRandomName(): string {
        const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Daniel', 'Laura', 'James', 'Emma'];
        const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Williams', 'Jones', 'Davis', 'Miller', 'Wilson', 'Anderson'];

        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        return `${randomFirstName} ${randomLastName}`;
    }

    private static getRandomWeight(): number {
        return Math.floor(Math.random() * (120 - 50 + 1)) + 50;
    }

    private static getRandomBelt(): BeltColor {
        const belts: BeltColor[] = [BeltColor.White, BeltColor.Blue, BeltColor.Purple, BeltColor.Brown];
        const randomIndex = Math.floor(Math.random() * belts.length);
        return belts[randomIndex];
    }

    loadItems(): Observable<Competitor[]> {
        const competitorsRef = collection(this.firestore, 'competitors');
        const competitorsQuery = query(competitorsRef, orderBy('created', 'asc'));
        return (collectionData(competitorsQuery, {idField: 'id'}) as Observable<Competitor[]>).pipe(
            delay(this.latency)
        );
    }


    loadItem(id: string): Observable<Competitor> {
        const competitorDocRef = doc(this.firestore, `competitors/${id}`);
        return from(getDoc(competitorDocRef)).pipe(
            delay(this.latency),
            map(doc => {
                return {
                    ...<Competitor>doc.data(),
                    id: doc.id
                }
            })
        );
    }

    createItem(competitor: Competitor): Observable<string> {
        const competitors = collection(this.firestore, 'competitors');
        const data = CompetitorFactory.raw(competitor);
        return from(addDoc(competitors, data)).pipe(
            delay(this.latency),
            map(doc => doc.id),
        );
    }

    updateItem(competitor: Competitor): Observable<string> {
        const competitorDocRef = doc(this.firestore, `competitors/${competitor.id}`);
        return from(updateDoc(competitorDocRef, {...CompetitorFactory.raw(competitor)})).pipe(
            map(() => competitor.id!)
        )
    }

    deleteItem(id: string): Observable<string> {
        const competitorDocRef = doc(this.firestore, `competitors/${id}`);
        return from(deleteDoc(competitorDocRef)).pipe(
            delay(this.latency),
            map(() => id),
            catchError(() => of('-1'))
        )
    }
}
