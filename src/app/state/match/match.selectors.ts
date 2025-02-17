import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";

export const selectMatchState = (state: AppState) => state.matches;

export const selectAllMatches = createSelector(
    selectMatchState,
    (state) => state.items
);
export const selectMatchStatus = createSelector(
    selectMatchState,
    (state) => state.status
)

export const selectMatchError = createSelector(
    selectMatchState,
    (state) => state.error
)