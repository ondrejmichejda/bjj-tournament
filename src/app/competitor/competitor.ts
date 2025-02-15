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

export interface Competitor extends CompetitorCreateRequest {
    id: number;
}

export enum BeltColor {
    White = 'white',
    Blue = 'blue',
    Purple = 'purple',
    Brown = 'brown',
    Black = 'black'
}