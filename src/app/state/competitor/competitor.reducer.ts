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
import {BaseState, Status} from "../../base/base-state";

export const initialState: BaseState<Competitor> = {
    items: [],
    deleted: [],
    error: '',
    status: Status.Pending
}

export const competitorReducer = createReducer(
    initialState,
    on(loadCompetitors, (state) => ({
            ...state,
            items: state.items.map(c => {
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
            const pending = state.items
                .filter(c => c.pending && !competitors.some(c2 => c2.uid === c.uid));
            return (
                {
                    ...state,
                    items: [...persistent, ...pending],
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
            items: [...state.items, {...competitor, id: "undefined", pending: true}],
            status: Status.Loading,
        })
    ),
    on(updateCompetitor, (state, {competitor}) => (
        {
            ...state,
            items: state.items.map(c => c.id === competitor.id ? {...c, ...competitor, pending: true} : c),
            status: Status.Loading,
        })
    ),
    on(deleteCompetitor, (state, {competitor}) => (
        {
            ...state,
            items: state.items.filter(c => c.id !== competitor.id),
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
