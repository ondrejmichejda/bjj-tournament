import {Competitor} from '../../competitor/competitor';
import {
    addCompetitor,
    addCompetitorSuccess,
    deleteCompetitor,
    deleteCompetitorSuccess,
    loadCompetitors,
    loadCompetitorsFailed,
    loadCompetitorsSuccess,
    updateCompetitor,
    updateCompetitorSuccess
} from './competitor.actions';
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
    on(loadCompetitors, (state) => ({
            ...state,
            status: Status.Loading,
        })
    ),
    on(loadCompetitorsSuccess, (state, {competitors}) => (
        {
            ...state,
            competitors: competitors.map(c => {
                return {...c, pending: false}
            }),
            status: Status.Success,
        })
    ),
    on(loadCompetitorsFailed, (state, {error}) => (
        {
            ...state,
            status: Status.Error,
            error: error,
        })
    ),
    on(addCompetitor, (state, {competitor}) => (
        {
            ...state,
            competitors: [...state.competitors, {...competitor, id: 0, pending: true}],
            status: Status.Loading,
        })
    ),
    on(addCompetitorSuccess, (state, {competitor}) => (
        {
            ...state,
            competitors: state.competitors.map(c => c.uid === competitor.uid ?
                {...competitor, pending: false} : c),
            status: Status.Success,
        }
    )),
    on(updateCompetitor, (state, {competitor}) => (
        {
            ...state,
            competitors: state.competitors.map(c => c.id === competitor.id ? {...c, ...competitor, pending: true} : c),
            status: Status.Loading,
        })
    ),
    on(updateCompetitorSuccess, (state, {competitor}) => (
        {
            ...state,
            competitors: state.competitors.map(c => c.id === competitor.id ?
                {...competitor, pending: false} : c),
            status: Status.Success,
        }
    )),
    on(deleteCompetitor, (state, {competitor}) => (
        {
            ...state,
            competitors: state.competitors.filter(c => c.id !== competitor.id),
            status: Status.Loading,
        })
    ),
    on(deleteCompetitorSuccess, (state) => (
        {
            ...state,
            status: Status.Success,
        }
    ))
);
