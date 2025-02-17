import {FirebaseEntity} from "../base/firebase-entity.service";
import {Competitor} from "../competitor/competitor";


export class Match extends FirebaseEntity {

    constructor(public competitorA?: Competitor,
                public competitorB?: Competitor) {
        super();
    }
}
