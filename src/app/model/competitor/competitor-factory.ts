import {BeltColor, Competitor} from "./competitor";

/**
 * Class responsible for creating instances of Competitor.
 */
export class CompetitorFactory {

    static create(name: string, weight: number, belt: BeltColor): Competitor {
        return new Competitor(name, weight, belt);
    }

    /**
     * A function that transforms a Competitor object into a simplified object
     * with selected properties.
     *
     * @param {Competitor} competitor - The Competitor object to be transformed.
     * @returns {Object} An object containing the following properties:
     *   - uid: The unique identifier of the competitor.
     *   - name: The name of the competitor.
     *   - weight: The weight of the competitor.
     *   - belt: The belt level of the competitor.
     *   - create: The creation date of the competitor record.
     */
    static transformFn = (competitor: Competitor) => {
        return {
            uid: competitor.uid,
            name: competitor.name,
            weight: competitor.weight,
            belt: competitor.belt,
            created: competitor.created
        }
    }
}