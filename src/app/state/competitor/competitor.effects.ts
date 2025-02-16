import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
    addCompetitorSuccess,
    changeCompetitorFailure,
    CompetitorActions,
    deleteCompetitorSuccess,
    loadCompetitorsFailed,
    loadCompetitorsSuccess,
    updateCompetitorSuccess
} from "./competitor.actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {CompetitorService} from "../../competitor/competitor.service";
import {Competitor} from "../../competitor/competitor";
import {AlertService} from "../../service/alert.service";

@Injectable()
export class CompetitorEffects {

    private actions$ = inject(Actions);

    private competitorSvc = inject(CompetitorService);
    loadCompetitors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.loadCompetitors),
            mergeMap(() =>
                this.competitorSvc.loadItems().pipe(
                    map(competitors => loadCompetitorsSuccess({competitors: <Competitor[]>competitors})),
                    catchError(error => of(loadCompetitorsFailed({error: error.message})))
                )
            )
        )
    );
    addCompetitor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.addCompetitor),
            mergeMap(action =>
                this.competitorSvc.createItem(action.competitor).pipe(
                    map(competitor => addCompetitorSuccess({id: competitor})),
                    catchError(error => of(changeCompetitorFailure({error: error.message})))
                )
            )
        )
    )
    updateCompetitor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.updateCompetitor),
            mergeMap(action =>
                this.competitorSvc.updateItem(action.competitor).pipe(
                    map(competitor => updateCompetitorSuccess({id: competitor})),
                    catchError(error => of(changeCompetitorFailure({error: error.message})))
                )
            )
        )
    )
    deleteCompetitor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.deleteCompetitor),
            mergeMap(action =>
                this.competitorSvc.deleteItem(action.competitor.id).pipe(
                    map(id => deleteCompetitorSuccess({id: id})),
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