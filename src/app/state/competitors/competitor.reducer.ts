import {Competitor} from '../../model/competitor';
import {addCompetitor, removeCompetitor} from './competitor.actions';
import {createReducer, on} from '@ngrx/store';

export interface CompetitorState {
    competitors: Competitor[],
    error: string,
    status: 'pending' | 'loading' | 'error' | 'success'
}

export const initialState: CompetitorState = {
    competitors: [], error: '', status: 'pending'
}

export const competitorReducer =
    createReducer(initialState, on(
        addCompetitor,
        (state, {competitor}) => (
            {
                ...state, competitors: [...state.competitors, competitor]
            }
        )
    ), on(
        removeCompetitor,
        (state, {competitor}) => (
            {
                ...state, competitors: state.competitors.filter(c => c.id !== competitor.id)
            }
        )
    ));
