import {BaseState} from "../base/base-state";
import {Competitor} from "../competitor/competitor";
import {Match} from "../match/match";

export interface AppState {
    competitors: BaseState<Competitor>,
    matches: BaseState<Match>
}
