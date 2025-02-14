export class Competitor {

    constructor(public name: string,
                public weight: number,
                public belt: 'white' | 'blue' | 'purple' | 'brown' | 'black',
                public id?: number) {
    }
}