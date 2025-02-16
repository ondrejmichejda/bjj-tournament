import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
    addCompetitorSuccess,
    changeCompetitorFailure,
    CompetitorActions,
    deleteCompetitorSuccess,
    loadCompetitors,
    loadCompetitorsFailed,
    loadCompetitorsSuccess,
    updateCompetitorSuccess
} from "./competitor.actions";
import {catchError, delay, map, mergeMap, of, tap} from "rxjs";
import {CompetitorService} from "../../competitor/competitor.service";
import {Competitor} from "../../competitor/competitor";
import {AlertService} from "../../service/alert.service";

@Injectable()
export class CompetitorEffects {

    private actions$ = inject(Actions);
    afterFailed = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.changeCompetitorFailure),
            map(() => loadCompetitors())
        )
    )

    private competitorSvc = inject(CompetitorService);
    loadCompetitors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.loadCompetitors),
            mergeMap(() =>
                this.competitorSvc.getAll().pipe(
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
    addCompetitor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.addCompetitor),
            mergeMap(action =>
                this.competitorSvc.create(action.competitor).pipe(
                    delay(randomDelay()),
                    map(competitor => addCompetitorSuccess({competitor: competitor})),
                    catchError(error => of(changeCompetitorFailure({error: error.message})))
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
                    catchError(error => of(changeCompetitorFailure({error: error.message})))
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
                    catchError(error => of(changeCompetitorFailure({error: error.message})))
                )
            )
        )
    )
    private alertSvc = inject(AlertService);
    changeCompetitorFailed$ = createEffect(() =>
            this.actions$.pipe(
                ofType(CompetitorActions.changeCompetitorFailure),
                tap(action => {
                    this.alertSvc.error(action.error);
                    return of();
                })
            ),
        {dispatch: false}
    )
}

export const randomDelay = (max: number = 1000) => Math.floor(Math.random() * max);
