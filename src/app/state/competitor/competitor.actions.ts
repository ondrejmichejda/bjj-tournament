import {createAction, props} from '@ngrx/store';
import {Competitor} from "../../competitor/competitor";

export enum CompetitorActions {
    loadCompetitors = '[Competitor] Load Competitors',
    loadCompetitorsSuccess = '[Competitor] Load Competitors Success',
    loadCompetitorsFailure = '[Competitor] Load Competitors Failure',
}

export const loadCompetitors = createAction(CompetitorActions.loadCompetitors);
export const loadCompetitorsSuccess = createAction(
    CompetitorActions.loadCompetitorsSuccess,
    props<{ competitors: Competitor[] }>()
);
export const loadCompetitorsFailed = createAction(
    CompetitorActions.loadCompetitorsFailure,
    props<{ error: string }>()
);

