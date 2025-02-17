import {createReducer, on} from '@ngrx/store';
import {BaseState, Status} from "../../base/base-state";
import {Match} from "../../match/match";
import {
    addMatch,
    deleteMatch,
    deleteMatchSuccess,
    loadMatches,
    loadMatchesFailed,
    loadMatchesSuccess,
    updateMatch
} from "./match.actions";

export const initialState: BaseState<Match> = {
    items: [],
    deleted: [],
    error: '',
    status: Status.Pending
}

export const matchReducer = createReducer(
    initialState,
    on(loadMatches, (state) => ({
            ...state,
            items: state.items.map(c => {
                return {...c, pending: true}
            }),
            status: Status.Loading,
        })
    ),
    on(loadMatchesSuccess, (state, {matches}) => {
            /**
             * Get server only values filtered from currently deleted items (in process of deletion)
             */
            const persistent = matches
                .map(c => {
                    return {...c, pending: false}
                })
                .filter(c => !state.deleted.some(c2 => c2.id === c.id))
            /**
             * Get local state items only
             */
            const pending = state.items
                .filter(c => c.pending && !matches.some(c2 => c2.uid === c.uid));
            return (
                {
                    ...state,
                    items: [...persistent, ...pending],
                    status: Status.Success,
                }
            )
        }
    ),
    on(loadMatchesFailed, (state, {error}) => (
        {
            ...state,
            status: Status.Error,
            error: error,
        })
    ),
    on(addMatch, (state, {match}) => (
        {
            ...state,
            items: [...state.items, {...match, id: "undefined", pending: true}],
            status: Status.Loading,
        })
    ),
    on(updateMatch, (state, {match}) => (
        {
            ...state,
            items: state.items.map(c => c.id === match.id ? {...c, ...match, pending: true} : c),
            status: Status.Loading,
        })
    ),
    on(deleteMatch, (state, {match}) => (
        {
            ...state,
            items: state.items.filter(c => c.id !== match.id),
            status: Status.Loading,
            deleted: [...state.deleted, match]
        })
    ),
    on(deleteMatchSuccess, (state, {id}) => (
        {
            ...state,
            deleted: state.deleted.filter(c => c.id !== id)
        }
    ))
);
