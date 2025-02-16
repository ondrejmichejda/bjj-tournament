export interface Competitor {
    /**
     * ID generated by firestore
     */
    id?: string;

    /**
     * UID is generated on creation as UI identifier for optimized UI
     */
    uid: number;

    /**
     * True until client and server are synchronized
     */
    pending: boolean;

    created: number;

    name: string;
    weight: number;
    belt: BeltColor;
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