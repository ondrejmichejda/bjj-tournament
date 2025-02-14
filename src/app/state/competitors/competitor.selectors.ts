import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {CompetitorState} from "./competitor.reducer";

export const selectCompetitors = (state: AppState) => state.competitors;
export const selectAllCompetitors = createSelector(
    selectCompetitors,
    (state: CompetitorState) => state.competitors
);