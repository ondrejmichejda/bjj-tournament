import {BeltColor, Competitor} from "./competitor";

/**
 * A factory class for creating competitor objects with predefined properties and additional generated attributes.
 */
export class CompetitorFactory {

    /**
     * Creates a new competitor object.
     *
     * @param {string} name - The name of the competitor.
     * @param {number} weight - The weight of the competitor.
     * @param {BeltColor} belt - The belt color of the competitor.
     * @return {Competitor} The newly created competitor object.
     */
    static create(name: string, weight: number, belt: BeltColor): Competitor {
        return {
            uid: new Date().getTime() + Math.floor(Math.random() * 1000),
            pending: true,
            created: new Date().getTime(),
            name: name,
            weight: weight,
            belt: belt,
        }
    }
}