/**
 * Represents a request to create a new competitor.
 * This class encapsulates the details required to create
 * a competitor, such as name, weight, and belt color.
 */
export class CompetitorCreateRequest {
    uid: number;
    pending: boolean;

    constructor(public name: string,
                public weight: number,
                public belt: BeltColor) {
        this.uid = new Date().getTime() + Math.floor(Math.random() * 1000);
        this.pending = true;
    }
}

/**
 * Represents a Competitor, extending properties from CompetitorCreateRequest and
 * including additional attributes specific to the Competitor entity.
 *
 * This interface encapsulates data about a Competitor, including its unique identifier.
 *
 * It is used to handle and manage Competitor-related data within the application.
 */
export interface Competitor extends CompetitorCreateRequest {
    id: number;
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