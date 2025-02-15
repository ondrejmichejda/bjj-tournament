import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CompetitorActions, loadCompetitorsFailed, loadCompetitorsSuccess} from "./competitor.actions";
import {catchError, map, mergeMap, of} from "rxjs";
import {CompetitorService} from "../../competitor/competitor.service";
import {Competitor} from "../../competitor/competitor";

@Injectable()
export class CompetitorEffects {

    private actions$ = inject(Actions);
    private competitorSvc = inject(CompetitorService);

    loadCompetitors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.loadCompetitors),
            mergeMap(() =>
                this.competitorSvc.get().pipe(
                    map(competitors => loadCompetitorsSuccess({competitors: <Competitor[]>competitors})),
                    catchError(error => of(loadCompetitorsFailed({error: error.message})))
                )
            )
        )
    );
}