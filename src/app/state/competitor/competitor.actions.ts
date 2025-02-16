import {createAction, props} from '@ngrx/store';
import {Competitor} from "../../competitor/competitor";

/**
 * Represents the set of actions that can be performed on competitors.
 * This enum defines the various states and outcomes of operations
 * related to loading, adding, updating, and deleting competitors.
 *
 * Actions are categorized as:
 * - Load operations: Fetch competitors data from a source.
 * - Add operations: Add a new competitor to the collection.
 * - Update operations: Update details of an existing competitor.
 * - Delete operations: Remove a competitor from the collection.
 * - General failure: Captures errors related to create, update, and delete operations.
 */
export enum CompetitorActions {
    // load data
    loadCompetitors = '[Competitor] Load Competitors',
    loadCompetitorsSuccess = '[Competitor] Load Competitors Success',
    loadCompetitorsFailure = '[Competitor] Load Competitors Failure',
    // add
    addCompetitor = '[Competitor] Add Competitor',
    addCompetitorSuccess = '[Competitor] Add Competitor Success',
    // update
    updateCompetitor = '[Competitor] Update Competitor',
    updateCompetitorSuccess = '[Competitor] Update Competitor Success',
    // delete
    deleteCompetitor = '[Competitor] Delete Competitor',
    deleteCompetitorSuccess = '[Competitor] Delete Competitor Success',
    // general failure create, update, delete
    changeCompetitorFailure = '[Competitor] Change Competitor Failure',
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
    props<{ competitor: Competitor }>()
);
export const addCompetitorSuccess = createAction(
    CompetitorActions.addCompetitorSuccess,
    props<{ competitor: Competitor }>()
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

// delete
export const deleteCompetitor = createAction(
    CompetitorActions.deleteCompetitor,
    props<{ competitor: Competitor }>()
);
export const deleteCompetitorSuccess = createAction(
    CompetitorActions.deleteCompetitorSuccess
);

// general failure
export const changeCompetitorFailure = createAction(
    CompetitorActions.changeCompetitorFailure,
    props<{ error: string }>()
)