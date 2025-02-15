import {Competitor} from '../../competitor/competitor';
import {loadCompetitors, loadCompetitorsFailed, loadCompetitorsSuccess} from './competitor.actions';
import {createReducer, on} from '@ngrx/store';

export enum Status {
    Pending,
    Loading,
    Error,
    Success
}

export interface CompetitorState {
    competitors: Competitor[],
    error: string | null,
    status: Status
}

export const initialState: CompetitorState = {
    competitors: [],
    error: '',
    status: Status.Pending
}

export const competitorReducer = createReducer(
    initialState,
    on(loadCompetitors, (state) => ({
        ...state,
        error: null,
        status: Status.Loading,
    })),
    on(loadCompetitorsSuccess, (state, {competitors}) => ({
        ...state,
        competitors: competitors,
        status: Status.Success,
        error: null
    })),
    on(loadCompetitorsFailed, (state, {error}) => ({
        ...state,
        status: Status.Error,
        error: error,
    }))
);
