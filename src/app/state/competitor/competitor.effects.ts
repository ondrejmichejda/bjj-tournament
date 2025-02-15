import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CompetitorActions, loadCompetitorsFailed, loadCompetitorsSuccess} from "./competitor.actions";
import {catchError, debounceTime, delay, map, mergeMap, of} from "rxjs";
import {CompetitorService} from "../../competitor/competitor.service";
import {Competitor} from "../../competitor/competitor";

@Injectable()
export class CompetitorEffects {

    private actions$ = inject(Actions);
    private competitorSvc = inject(CompetitorService);

    loadCompetitors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompetitorActions.loadCompetitors),
            debounceTime(300),
            mergeMap(() =>
                this.competitorSvc.get().pipe(
                    delay(randomDelay()),
                    map(competitors => loadCompetitorsSuccess({competitors: <Competitor[]>competitors})),
                    catchError(error => of(loadCompetitorsFailed({error: error.message}))
                        .pipe(delay(randomDelay())))
                )
            )
        )
    );
}

export const randomDelay = (max: number = 1000) => Math.floor(Math.random() * max);
