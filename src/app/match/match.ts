import {FirebaseEntity} from "../base/firebase-entity.service";
import {Competitor} from "../competitor/competitor";

export class Match extends FirebaseEntity {

    /**
     * Constructs a Match instance with the given competitors.
     *
     * @param {Competitor} [competitorA] - The first competitor in the match.
     * @param {Competitor} [competitorB] - The second competitor in the match.
     * @return {Match} A new instance of the Match class.
     */
    constructor(public competitorA?: Competitor,
                public competitorB?: Competitor) {
        super();
    }
}
