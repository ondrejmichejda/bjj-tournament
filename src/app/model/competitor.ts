import {Storable} from '../interface/storable';

export class Competitor implements Storable<Competitor> {

    id?: number;

    constructor(public name: string,
                public weight: number,
                public belt: 'white' | 'blue' | 'purple' | 'brown' | 'black') {
    }

    deserialize(data: string): Competitor {
        return JSON.parse(data);
    }

    serialize(): string {
        return JSON.stringify(this);
    }

}