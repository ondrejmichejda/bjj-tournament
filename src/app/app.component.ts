import {Component, inject, OnInit} from '@angular/core';
import {CompetitorService} from "./competitor/competitor.service";
import {AsyncPipe} from "@angular/common";
import {Competitor} from "./competitor/competitor";
import {Store} from "@ngrx/store";
import {loadCompetitors} from "./state/competitor/competitor.actions";
import {selectAllCompetitors} from "./state/competitor/competitor.selectors";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        AsyncPipe
    ],
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    private store = inject(Store);
    competitors$ = this.store.select(selectAllCompetitors);
    private competitorSvc = inject(CompetitorService);

    // competitors$ = <Observable<Competitor[]>>this.competitorSvc.get();

    ngOnInit() {
        this.store.dispatch(loadCompetitors());
    }

    createRandomCompetitor() {
        this.competitorSvc.create(CompetitorService.getRandomCompetitor());
    }

    deleteCompetitor(competitor: Competitor) {
        this.competitorSvc.delete(competitor.id!);
    }

    updateCompetitor(competitor: Competitor) {
        this.competitorSvc.update({...CompetitorService.getRandomCompetitor(), id: competitor.id});
    }
}
