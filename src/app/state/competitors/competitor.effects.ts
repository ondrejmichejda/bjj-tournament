import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadCompetitors, loadCompetitorsFailure, loadCompetitorsSuccess} from "./competitor.actions";
import {catchError, from, map, of, switchMap} from "rxjs";
import {CompetitorService} from "../../competitor/competitor.service";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";

@Injectable()
export class CompetitorEffects {

    private actions$ = inject(Actions);
    private competitorSvc = inject(CompetitorService);
    loadCompetitors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCompetitors),
            switchMap(() =>
                from(this.competitorSvc.get()).pipe(
                    map(competitors => loadCompetitorsSuccess({competitors: competitors})),
                    catchError(error => of(loadCompetitorsFailure({error: error.message})))
                )
            )
        )
    );
    private store = inject(Store<AppState>);
}