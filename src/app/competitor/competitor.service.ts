import {inject, Injectable} from '@angular/core';
import {BeltColor, Competitor} from './competitor';
import {catchError, from, map, mergeMap, Observable, of} from 'rxjs';
import {
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    Firestore,
    getDoc,
    updateDoc
} from "@angular/fire/firestore";
import {CompetitorFactory} from "./competitor-factory";

@Injectable({
    providedIn: 'root'
})
export class CompetitorService {

    private firestore = inject(Firestore);


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

    getAll(): Observable<Competitor[]> {
        const competitorsRef = collection(this.firestore, 'competitors');
        return collectionData(competitorsRef, {idField: 'id'}) as Observable<Competitor[]>;
    }

    getOne(id: string): Observable<Competitor> {
        const competitorDocRef = doc(this.firestore, `competitors/${id}`);
        return from(getDoc(competitorDocRef)).pipe(
            map(doc => doc.data() as Competitor)
        );
    }

    create(competitor: Competitor): Observable<Competitor> {
        const competitors = collection(this.firestore, 'competitors');
        return from(addDoc(competitors, competitor)).pipe(
            map(docSnap => {
                console.log(docSnap);
                return competitor;
            })
        );
    }

    update(competitor: Competitor): Observable<Competitor> {
        const competitorDocRef = doc(this.firestore, `competitors/${competitor.id}`);
        return from(updateDoc(competitorDocRef, {...competitor})).pipe(
            mergeMap(() =>
                this.getOne(competitor.id!).pipe(
                    map(updatedCompetitor => <Competitor>updatedCompetitor)
                )
            )
        )
    }

    delete(competitorId: number): Observable<boolean> {
        const competitorDocRef = doc(this.firestore, `competitors/${competitorId}`);
        return from(deleteDoc(competitorDocRef)).pipe(
            map(() => true),
            catchError(() => of(false))
        )
    }
}
