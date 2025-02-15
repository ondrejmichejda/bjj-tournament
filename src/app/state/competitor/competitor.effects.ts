import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
    addCompetitorFailed,
    addCompetitorSuccess,
    CompetitorActions,
    deleteCompetitorFailed,
    deleteCompetitorSuccess,
    loadCompetitors,
    loadCompetitorsFailed,
    loadCompetitorsSuccess,
    updateCompetitorFailed,
    updateCompetitorSuccess
} from "./competitor.actions";
import {catchError, delay, map, mergeMap, of, tap} from "rxjs";
import {CompetitorService} from "../../competitor/competitor.service";
import {Competitor} from "../../competitor/competitor";
import {AlertService} from "../../service/alert.service";

@Injectable()
export class CompetitorEffects {

    private actions$ = inject(Actions);
    afterAddCompetitorFailed$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.addCompetitorFailure),
            map(() => loadCompetitors())
        )
    )
    afterUpdateFailedCompetitor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.updateCompetitorFailure),
            map(() => loadCompetitors())
        )
    )
    afterDeleteFailedCompetitor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.deleteCompetitorFailure),
            map(() => loadCompetitors())
        )
    )
    private competitorSvc = inject(CompetitorService);
    loadCompetitors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.loadCompetitors),
            mergeMap(() =>
                this.competitorSvc.get().pipe(
                    delay(randomDelay()),
                    map(competitors => loadCompetitorsSuccess({competitors: <Competitor[]>competitors})),
                    catchError(error => {
                        console.log(error);
                        return of(loadCompetitorsFailed({error: error.message}))
                            .pipe(delay(randomDelay()))
                    })
                )
            )
        )
    );
    private alertSvc = inject(AlertService);
    addCompetitor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.addCompetitor),
            mergeMap(action =>
                this.competitorSvc.create(action.competitor).pipe(
                    delay(randomDelay()),
                    map(competitor => addCompetitorSuccess({competitor: competitor})),
                    catchError(error => of(addCompetitorFailed({error: error.message}))
                        .pipe(delay(randomDelay()),
                            tap(() => {
                                this.alertSvc.error();
                            }))
                    )
                )
            )
        )
    )
    updateCompetitor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.updateCompetitor),
            mergeMap(action =>
                this.competitorSvc.update(action.competitor).pipe(
                    delay(randomDelay()),
                    map(competitor => updateCompetitorSuccess({competitor: competitor})),
                    catchError(error => of(updateCompetitorFailed({error: error.message}))
                        .pipe(delay(randomDelay()),
                            tap(() => {
                                this.alertSvc.error();
                            }))
                    )
                )
            )
        )
    )
    deleteCompetitor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.deleteCompetitor),
            mergeMap(action =>
                this.competitorSvc.delete(action.competitor.id).pipe(
                    delay(randomDelay()),
                    map(() => deleteCompetitorSuccess()),
                    catchError(error => of(deleteCompetitorFailed({error: error.message}))
                        .pipe(delay(randomDelay()),
                            tap(() => {
                                this.alertSvc.error();
                            }))
                    )
                )
            )
        )
    )
}

export const randomDelay = (max: number = 1000) => Math.floor(Math.random() * max);
