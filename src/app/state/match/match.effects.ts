import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";

import {catchError, map, mergeMap, of, tap} from "rxjs";
import {AlertService} from "../../service/alert.service";
import {MatchService} from "../../match/match.service";
import {Match} from "../../match/match";
import {
    addMatchSuccess,
    changeMatchFailure,
    deleteMatchSuccess,
    loadMatchesFailed,
    loadMatchesSuccess,
    MatchActions,
    updateMatchSuccess
} from "./match.actions";


@Injectable()
export class MatchEffects {

    private actions$ = inject(Actions);

    private matchSvc = inject(MatchService);
    loadMatches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.loadMatches),
            mergeMap(() =>
                this.matchSvc.loadItems().pipe(
                    map(competitors => loadMatchesSuccess({matches: <Match[]>competitors})),
                    catchError(error => of(loadMatchesFailed({error: error.message})))
                )
            )
        )
    );
    addMatch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.addMatch),
            mergeMap(action =>
                this.matchSvc.createItem(action.match).pipe(
                    map(competitor => addMatchSuccess({id: competitor})),
                    catchError(error => of(changeMatchFailure({error: error.message})))
                )
            )
        )
    )
    updateMatch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.updateMatch),
            mergeMap(action =>
                this.matchSvc.updateItem(action.match).pipe(
                    map(competitor => updateMatchSuccess({id: competitor})),
                    catchError(error => of(changeMatchFailure({error: error.message})))
                )
            )
        )
    )
    deleteMatch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.deleteMatch),
            mergeMap(action =>
                this.matchSvc.deleteItem(action.match.id).pipe(
                    map(id => deleteMatchSuccess({id: id})),
                    catchError(error => of(changeMatchFailure({error: error.message})))
                )
            )
        )
    )
    deleteMatchBulk$ = createEffect(() =>
            this.actions$.pipe(
                ofType(MatchActions.deleteMatchBulk),
                tap(action =>
                    this.matchSvc.deleteBulk((<Match[]>action.matches).map(c => c.id)).pipe(
                        catchError(error => of(changeMatchFailure({error: error.message})))
                    )
                )
            ),
        {
            dispatch: false
        }
    )
    private alertSvc = inject(AlertService);
    changeMatchFailed$ = createEffect(() =>
            this.actions$.pipe(
                ofType(MatchActions.changeMatchFailure),
                tap(action => {
                    this.alertSvc.error(action.error);
                    return of();
                })
            ),
        {dispatch: false}
    )
}