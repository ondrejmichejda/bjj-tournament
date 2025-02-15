import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";

export const selectCompetitorState = (state: AppState) => state.competitors;

export const selectAllCompetitors = createSelector(
    selectCompetitorState,
    (state) => state.competitors
);