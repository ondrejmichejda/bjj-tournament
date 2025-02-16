import {BeltColor, Competitor, CompetitorData} from "./competitor";

export class CompetitorFactory {

    static create(name: string, weight: number, belt: BeltColor): Competitor {
        return {
            uid: new Date().getTime() + Math.floor(Math.random() * 1000),
            pending: true,
            created: new Date().getTime(),
            name: name,
            weight: weight,
            belt: belt,
        }
    }

    static raw(competitor: Competitor): CompetitorData {
        return {
            uid: competitor.uid,
            created: competitor.created,
            name: competitor.name,
            weight: competitor.weight,
            belt: competitor.belt
        }
    }
}