import {createAction, props} from '@ngrx/store';
import {Competitor, CompetitorCreateRequest} from "../../competitor/competitor";

/**
 * Enumeration representing different actions related to competitors.
 *
 * The `CompetitorActions` enum defines various states and interactions
 * that can be performed, such as loading, adding competitors as well as handling
 * their success or failure outcomes.
 *
 * Members:
 * - `loadCompetitors`: Action for initiating the loading of competitor data.
 * - `loadCompetitorsSuccess`: Action triggered when competitor data is successfully loaded.
 * - `loadCompetitorsFailure`: Action triggered when there is an error in loading competitor data.
 * - `addCompetitor`: Action for initiating the addition of a new competitor.
 * - `addCompetitorSuccess`: Action triggered when a new competitor is successfully added.
 * - `addCompetitorFailure`: Action triggered when there is an error in adding a competitor.
 */
export enum CompetitorActions {
    // load data
    loadCompetitors = '[Competitor] Load Competitors',
    loadCompetitorsSuccess = '[Competitor] Load Competitors Success',
    loadCompetitorsFailure = '[Competitor] Load Competitors Failure',
    // add
    addCompetitor = '[Competitor] Add Competitor',
    addCompetitorSuccess = '[Competitor] Add Competitor Success',
    addCompetitorFailure = '[Competitor] Add Competitor Failure',
    // update
    updateCompetitor = '[Competitor] Update Competitor',
    updateCompetitorSuccess = '[Competitor] Update Competitor Success',
    updateCompetitorFailure = '[Competitor] Update Competitor Failure',
    // delete
    deleteCompetitor = '[Competitor] Delete Competitor',
    deleteCompetitorSuccess = '[Competitor] Delete Competitor Success',
    deleteCompetitorFailure = '[Competitor] Delete Competitor Failure',
}

// get all
export const loadCompetitors = createAction(CompetitorActions.loadCompetitors);
export const loadCompetitorsSuccess = createAction(
    CompetitorActions.loadCompetitorsSuccess,
    props<{ competitors: Competitor[] }>()
);
export const loadCompetitorsFailed = createAction(
    CompetitorActions.loadCompetitorsFailure,
    props<{ error: string }>()
);

// add new
export const addCompetitor = createAction(
    CompetitorActions.addCompetitor,
    props<{ competitor: CompetitorCreateRequest }>()
);
export const addCompetitorSuccess = createAction(
    CompetitorActions.addCompetitorSuccess,
    props<{ competitor: Competitor }>()
);
export const addCompetitorFailed = createAction(
    CompetitorActions.addCompetitorFailure,
    props<{ error: string }>()
);

// update
export const updateCompetitor = createAction(
    CompetitorActions.updateCompetitor,
    props<{ competitor: Competitor }>()
);
export const updateCompetitorSuccess = createAction(
    CompetitorActions.updateCompetitorSuccess,
    props<{ competitor: Competitor }>()
);
export const updateCompetitorFailed = createAction(
    CompetitorActions.updateCompetitorFailure,
    props<{ error: string }>()
);

// delete
export const deleteCompetitor = createAction(
    CompetitorActions.deleteCompetitor,
    props<{ competitor: Competitor }>()
);
export const deleteCompetitorSuccess = createAction(
    CompetitorActions.deleteCompetitorSuccess
);
export const deleteCompetitorFailed = createAction(
    CompetitorActions.deleteCompetitorFailure,
    props<{ error: string }>()
);