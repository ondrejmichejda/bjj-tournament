import {createAction, props} from '@ngrx/store';
import {Competitor} from '../../model/competitor';

export const addCompetitor = createAction('[Competitor] Add', props<{ competitor: Competitor }>());
export const removeCompetitor = createAction('[Competitor] Remove', props<{ competitor: Competitor }>());
export const loadCompetitors = createAction('[Competitor] Load');
export const loadCompetitorsSuccess = createAction('[Competitor API] Load Success', props<{
        competitors: Competitor[]
    }>()
);
export const loadCompetitorsFailure = createAction('[Competitor API] Load Failure');
