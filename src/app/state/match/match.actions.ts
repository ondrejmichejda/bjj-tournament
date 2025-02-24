import {createAction, props} from '@ngrx/store';
import {Match} from "../../model/match/match";

export enum MatchActions {
    // load data
    loadMatches = '[Match] Load Matches',
    loadMatchesSuccess = '[Match] Load Matches Success',
    loadMatchesFailure = '[Match] Load Matches Failure',
    // add
    addMatch = '[Match] Add Match',
    addMatchSuccess = '[Match] Add Match Success',
    // update
    updateMatch = '[Match] Update Match',
    updateMatchSuccess = '[Match] Update Match Success',
    // delete
    deleteMatch = '[Match] Delete Match',
    deleteMatchBulk = '[Match] Delete Match Bulk',
    deleteMatchSuccess = '[Match] Delete Match Success',
    // general failure create, update, delete
    changeMatchFailure = '[Match] Change Match Failure',
}

// get all
export const loadMatches = createAction(MatchActions.loadMatches);
export const loadMatchesSuccess = createAction(
    MatchActions.loadMatchesSuccess,
    props<{ matches: Match[] }>()
);
export const loadMatchesFailed = createAction(
    MatchActions.loadMatchesFailure,
    props<{ error: string }>()
);

// add new
export const addMatch = createAction(
    MatchActions.addMatch,
    props<{ match: Match }>()
);
export const addMatchSuccess = createAction(
    MatchActions.addMatchSuccess,
    props<{ id: string }>()
);

// update
export const updateMatch = createAction(
    MatchActions.updateMatch,
    props<{ match: Match }>()
);
export const updateMatchSuccess = createAction(
    MatchActions.updateMatchSuccess,
    props<{ id: string }>()
);

// delete
export const deleteMatch = createAction(
    MatchActions.deleteMatch,
    props<{ match: Match }>()
);
export const deleteMatchSuccess = createAction(
    MatchActions.deleteMatchSuccess,
    props<{ id: string }>()
);
export const deleteMatchBulk = createAction(
    MatchActions.deleteMatchBulk,
    props<{ matches: Match[] }>()
)

// general failure
export const changeMatchFailure = createAction(
    MatchActions.changeMatchFailure,
    props<{ error: string }>()
)