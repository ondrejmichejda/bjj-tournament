import {Competitor} from '../../competitor/competitor';
import {loadCompetitors, loadCompetitorsFailed, loadCompetitorsSuccess} from './competitor.actions';
import {createReducer, on} from '@ngrx/store';

export enum Status {
    Pending = 'Pending',
    Loading = 'Loading',
    Error = 'Error',
    Success = 'Success'
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
    on(loadCompetitors, (state) => {
        // console.log('on loadCompetitors');
        return ({
            ...state,
            error: null,
            status: Status.Loading,
        })
    }),
    on(loadCompetitorsSuccess, (state, {competitors}) => {
        // console.log('on loadCompetitorsSuccess');
        return ({
            ...state,
            competitors: competitors,
            status: Status.Success,
            error: null
        })
    }),
    on(loadCompetitorsFailed, (state, {error}) => {
        // console.log('on loadCompetitorsFailed');
        return ({
            ...state,
            status: Status.Error,
            error: error,
        })
    })
);
