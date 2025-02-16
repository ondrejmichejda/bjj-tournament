import {FirebaseEntity} from "../base/firebase-entity.service";

/**
 * Represents a competitor with a name, weight, and belt color.
 * Inherits from the FirebaseEntity class.
 *
 * @class Competitor
 * @extends FirebaseEntity
 * @param {string} name - The name of the competitor.
 * @param {number} weight - The weight of the competitor.
 * @param {BeltColor} belt - The belt color of the competitor.
 */
export class Competitor extends FirebaseEntity {

    /**
     * Constructs a new instance of the class.
     *
     * @param {string} name - The name of the object.
     * @param {number} weight - The weight of the object.
     * @param {BeltColor} belt - The belt color associated with the object.
     */
    constructor(public name: string,
                public weight: number,
                public belt: BeltColor) {
        super();
    }
}

/**
 * Enumeration representing the different belt colors typically used in martial arts.
 * Each color represents a skill level or rank progression.
 */
export enum BeltColor {
    White = 'white',
    Blue = 'blue',
    Purple = 'purple',
    Brown = 'brown',
    Black = 'black'
}