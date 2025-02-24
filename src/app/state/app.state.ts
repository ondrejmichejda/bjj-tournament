import {BaseState} from "../base/base-state";
import {Competitor} from "../model/competitor/competitor";
import {Match} from "../model/match/match";

export interface AppState {
    competitors: BaseState<Competitor>,
    matches: BaseState<Match>
}
