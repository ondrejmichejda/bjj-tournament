import {Injectable} from '@angular/core';
import {Competitor} from './competitor';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CompetitorService {

    competitors: Competitor[] = [];

    static getRandomCompetitor(): Competitor {
        return {
            name: this.generateRandomString(10),
            belt: this.getRandomBelt(),
            weight: this.getRandomWeight()
        }
    }

    private static generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    private static getRandomWeight(): number {
        return Math.floor(Math.random() * (120 - 50 + 1)) + 50;
    }

    private static getRandomBelt(): 'white' | 'blue' | 'purple' | 'brown' | 'black' {
        const belts: Array<'white' | 'blue' | 'purple' | 'brown' | 'black'> = [
            'white',
            'blue',
            'purple',
            'brown',
            'black',
        ];
        const randomIndex = Math.floor(Math.random() * belts.length);
        return belts[randomIndex];
    }

    /**
     * Retrieves a competitor or a list of competitors based on the provided ID.
     * If an ID is specified, it returns the competitor with that ID.
     * If no ID is specified, it returns all competitors.
     *
     * @param {number} [id] - The ID of the competitor to retrieve. Optional.
     * @return {Observable<Competitor | Competitor[]>} An Observable emitting the competitor with the specified ID,
     *                                                  or an Observable emitting the list of all competitors.
     *                                                  If the specified ID does not exist, an error is thrown.
     */
    get(id?: number): Observable<Competitor | Competitor[]> {
        if (id) {
            const competitor = this.competitors.find(competitor => competitor.id === id);
            if (competitor) {
                return of(competitor);
            } else {
                return throwError(() => new Error(`Competitor with id ${id} not found`));
            }
        } else {
            return of(this.competitors);
        }
    }

    /**
     * Creates a new competitor and adds it to the list of competitors if it does not already exist.
     *
     * @param {Competitor} competitor - The competitor object to be added.
     * @return {Observable<Competitor>} An observable of the added competitor, or an error if the competitor already
     *     exists.
     */
    create(competitor: Competitor): Observable<Competitor> {
        const nextId = (this.competitors.slice().sort((a, b) => b.id! - a.id!)[0]?.id ?? -1) + 1;

        this.competitors.push({...competitor, id: nextId});
        return of(competitor);
    }

    /**
     * Updates a competitor's information in the existing collection.
     *
     * @param {Competitor} competitor - The competitor object containing updated data. The object must include an id
     *     that matches an existing competitor.
     * @return {Observable<Competitor>} An observable emitting the updated competitor if the operation is successful,
     *     or an error if the competitor is not found.
     */
    update(competitor: Competitor): Observable<Competitor> {
        let competitorIndex = this.findCompetitorIndexById(competitor.id);

        if (competitorIndex > -1) {
            this.competitors[competitorIndex] = {...competitor};
            return of(this.competitors[competitorIndex]);
        }

        return throwError(() => new Error(`Competitor with id ${competitor.id} not found`));
    }

    /**
     * Deletes a competitor by their unique identifier.
     *
     * @param {number} competitorId - The unique identifier of the competitor to be deleted.
     * @return {Observable<void>} An observable that completes if the deletion is successful,
     * or throws an error if the competitor with the given ID is not found.
     */
    delete(competitorId: number): Observable<void> {
        let competitorIndex = this.findCompetitorIndexById(competitorId);

        if (competitorIndex > -1) {
            this.competitors.splice(competitorIndex, 1);
            return of();
        }

        return throwError(() => new Error(`Competitor with id ${competitorId} not found`));
    }

    /**
     * Finds the index of a competitor in the competitors list by its unique identifier.
     *
     * @param {number} [id] - The unique identifier of the competitor to find.
     * @return {number} The index of the competitor in the list, or -1 if not found.
     */
    private findCompetitorIndexById(id?: number): number {
        return this.competitors.findIndex(c => c.id === id);
    }


}
