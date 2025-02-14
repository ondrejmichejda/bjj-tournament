import {Competitor} from '../../competitor/competitor';
import {
    addCompetitor,
    loadCompetitors,
    loadCompetitorsFailure,
    loadCompetitorsSuccess,
    removeCompetitor
} from './competitor.actions';
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

export const competitorReducer =
    createReducer(
        initialState,
        on(
            addCompetitor,
            (state, {competitor}) => (
                {...state, competitors: [...state.competitors, competitor]}
            )
        ),
        on(
            removeCompetitor,
            (state, {competitor}) => (
                {
                    ...state, competitors: state.competitors.filter(c => c.id !== competitor.id)
                }
            )
        ),
        on(
            loadCompetitors,
            (state) => (
                {
                    ...state,
                    status: Status.Loading
                }
            )
        ),
        on(
            loadCompetitorsSuccess,
            (state, {competitors}) => (
                {
                    ...state,
                    competitors: competitors,
                    error: null,
                    status: Status.Success
                }
            )
        ),
        on(
            loadCompetitorsFailure,
            (state, {error}) => (
                {
                    ...state,
                    error: error,
                    status: Status.Error
                }
            )
        )
    );