import {FirebaseState} from "../base/firebase-state";
import {Competitor} from "../competitor/competitor";
import {Match} from "../match/match";

export interface AppState {
    competitors: FirebaseState<Competitor>,
    matches: FirebaseState<Match>
}
