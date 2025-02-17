import {Injectable} from '@angular/core';
import {BeltColor, Competitor} from './competitor';
import {CompetitorFactory} from "./competitor-factory";
import {FirebaseEntityService} from "../base/firebase-entity.service";

@Injectable({
    providedIn: 'root'
})
export class CompetitorService extends FirebaseEntityService<Competitor> {

    constructor() {
        super('competitors', CompetitorFactory.transformFn);
    }

    /**
     * Generates and returns a random competitor object.
     *
     * The method utilizes `CompetitorFactory` to create a random competitor
     * by generating a random name, weight, and belt level.
     *
     * @return {Competitor} A newly created competitor instance with random attributes.
     */
    static getRandomCompetitor(): Competitor {
        return CompetitorFactory.create(this.generateRandomName(), this.getRandomWeight(), this.getRandomBelt());
    }

    /**
     * Generates a random name by selecting a random first name and a random last name
     * from predefined lists of names.
     *
     * @return {string} A randomly generated full name in the format "FirstName LastName".
     */
    private static generateRandomName(): string {
        const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Daniel', 'Laura', 'James', 'Emma'];
        const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Williams', 'Jones', 'Davis', 'Miller', 'Wilson', 'Anderson'];

        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        return `${randomFirstName} ${randomLastName}`;
    }

    /**
     * Generates a random weight value within the range of 50 to 120 (inclusive).
     *
     * @return {number} A randomly generated weight within the specified range.
     */
    private static getRandomWeight(): number {
        return Math.floor(Math.random() * (120 - 50 + 1)) + 50;
    }

    /**
     * Selects and returns a random belt color from a predefined list of belt colors.
     *
     * @return {BeltColor} A randomly chosen belt color from the available options.
     */
    private static getRandomBelt(): BeltColor {
        const belts: BeltColor[] = [BeltColor.White, BeltColor.Blue, BeltColor.Purple, BeltColor.Brown];
        const randomIndex = Math.floor(Math.random() * belts.length);
        return belts[randomIndex];
    }
}
