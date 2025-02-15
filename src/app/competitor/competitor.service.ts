import {Injectable} from '@angular/core';
import {BeltColor, Competitor, CompetitorCreateRequest} from './competitor';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CompetitorService {

    competitors: Competitor[] = [];

    /**
     * Generates a random competitor with predefined attributes such as name, belt, and weight.
     *
     * @return {CompetitorCreateRequest} An object representing a randomly generated competitor, including name, belt,
     *     and weight properties.
     */
    static getRandomCompetitor(): CompetitorCreateRequest {
        return new CompetitorCreateRequest(this.generateRandomString(10), this.getRandomWeight(), this.getRandomBelt());
    }

    /**
     * Generates a random string containing alphanumeric characters of specified length.
     *
     * @param {number} length - The length of the random string to generate.
     * @return {string} A randomly generated string of the specified length.
     */
    private static generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    /**
     * Generates a random weight value within a specified range.
     *
     * @return {number} A random integer representing a weight value between 50 and 120 inclusive.
     */
    private static getRandomWeight(): number {
        return Math.floor(Math.random() * (120 - 50 + 1)) + 50;
    }

    /**
     * Selects a random BeltColor from the predefined list of belt colors.
     *
     * @return {BeltColor} A randomly selected belt color.
     */
    private static getRandomBelt(): BeltColor {
        const belts: BeltColor[] = [BeltColor.White, BeltColor.Blue, BeltColor.Purple, BeltColor.Brown];
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
                return of(JSON.parse(JSON.stringify(competitor)));
            } else {
                return throwError(() => new Error(`Competitor with id ${id} not found`));
            }
        } else {
            return of(this.competitors);
        }
    }

    /**
     * Creates a new competitor and adds it to the competitors list.
     *
     * @param {CompetitorCreateRequest} competitor - The competitor creation request containing information for the new
     *     competitor.
     * @return {Observable<Competitor>} An observable that emits the newly created competitor.
     */
    create(competitor: CompetitorCreateRequest): Observable<Competitor> {

        // ID creation simulation
        const nextId = (this.competitors.slice().sort((a, b) => b.id! - a.id!)[0]?.id ?? -1) + 1;
        const newCompetitor = {...competitor, id: nextId};

        this.competitors = [...this.competitors, newCompetitor];
        return of(newCompetitor);
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
            const copy = this.competitors.slice();
            copy[competitorIndex] = {...competitor};
            this.competitors = [...copy];

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
    delete(competitorId: number): Observable<boolean> {
        let competitorIndex = this.findCompetitorIndexById(competitorId);

        if (competitorIndex > -1) {
            this.competitors = [...this.competitors.slice().filter(c => c.id !== competitorId)];

            return of(true);
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
