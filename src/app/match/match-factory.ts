import {Match} from "./match";
import {Competitor} from "../competitor/competitor";

/**
 * Class responsible for creating instances of Competitor.
 */
export class MatchFactory {

    static create(competitorA: Competitor, competitorB: Competitor): Match {
        return new Match(competitorA, competitorB);
    }
}