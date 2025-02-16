import {Competitor} from '../../competitor/competitor';
import {
    addCompetitor,
    deleteCompetitor,
    deleteCompetitorSuccess,
    loadCompetitors,
    loadCompetitorsFailed,
    loadCompetitorsSuccess,
    updateCompetitor
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
    deleted: Competitor[],
    error: string | null,
    status: Status
}

export const initialState: CompetitorState = {
    competitors: [],
    deleted: [],
    error: '',
    status: Status.Pending
}

export const competitorReducer = createReducer(
    initialState,
    on(loadCompetitors, (state) => ({
            ...state,
            competitors: state.competitors.map(c => {
                return {...c, pending: true}
            }),
            status: Status.Loading,
        })
    ),
    on(loadCompetitorsSuccess, (state, {competitors}) => {
            /**
             * Get server only values filtered from currently deleted items (in process of deletion)
             */
            const persistent = competitors
                .map(c => {
                    return {...c, pending: false}
                })
                .filter(c => !state.deleted.some(c2 => c2.id === c.id))
            /**
             * Get local state items only
             */
            const pending = state.competitors
                .filter(c => c.pending && !competitors.some(c2 => c2.uid === c.uid));
            return (
                {
                    ...state,
                    competitors: [...persistent, ...pending],
                    status: Status.Success,
                }
            )
        }
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
            competitors: [...state.competitors, {...competitor, id: "undefined", pending: true}],
            status: Status.Loading,
        })
    ),
    on(updateCompetitor, (state, {competitor}) => (
        {
            ...state,
            competitors: state.competitors.map(c => c.id === competitor.id ? {...c, ...competitor, pending: true} : c),
            status: Status.Loading,
        })
    ),
    on(deleteCompetitor, (state, {competitor}) => (
        {
            ...state,
            competitors: state.competitors.filter(c => c.id !== competitor.id),
            status: Status.Loading,
            deleted: [...state.deleted, competitor]
        })
    ),
    on(deleteCompetitorSuccess, (state, {id}) => (
        {
            ...state,
            deleted: state.deleted.filter(c => c.id !== id)
        }
    ))
);
