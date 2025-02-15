import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {Store} from "@ngrx/store";
import {CompetitorService} from "../../../competitor/competitor.service";
import {selectAllCompetitors} from "../../../state/competitor/competitor.selectors";
import {loadCompetitors} from "../../../state/competitor/competitor.actions";
import {Competitor} from "../../../competitor/competitor";

@Component({
    selector: 'app-competitor-list',
    imports: [
        AsyncPipe
    ],
    templateUrl: './competitor-list.component.html',
    styleUrl: './competitor-list.component.scss'
})
export class CompetitorListComponent implements OnInit {

    private store = inject(Store);
    competitors$ = this.store.select(selectAllCompetitors);
    private competitorSvc = inject(CompetitorService);

    ngOnInit() {
        this.store.dispatch(loadCompetitors());
    }

    deleteCompetitor(competitor: Competitor) {
        this.competitorSvc.delete(competitor.id!);
    }

    updateCompetitor(competitor: Competitor) {
        this.competitorSvc.update({...CompetitorService.getRandomCompetitor(), id: competitor.id});
    }
}
