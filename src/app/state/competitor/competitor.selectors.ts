import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";

export const selectCompetitorState = (state: AppState) => state.competitors;

export const selectAllCompetitors = createSelector(
    selectCompetitorState,
    (state) => state.items
);

export const selectCompetitorStatus = createSelector(
    selectCompetitorState,
    (state) => state.status
)

export const selectCompetitorError = createSelector(
    selectCompetitorState,
    (state) => state.error
)