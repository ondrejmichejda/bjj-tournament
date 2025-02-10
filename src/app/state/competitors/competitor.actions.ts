import {createAction, props} from '@ngrx/store';
import {Competitor} from '../../model/competitor';

export const addCompetitor = createAction(
    '[Competitor] Add',
    props<Competitor>
);

export const removeCompetitor = createAction('[Competitor] Remove', props<Competitor>());
