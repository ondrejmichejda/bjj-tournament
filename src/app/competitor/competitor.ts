export interface CompetitorCreateRequest {
    name: string;
    weight: number;
    belt: BeltColor;
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