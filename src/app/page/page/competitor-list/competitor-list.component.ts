import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {Store} from "@ngrx/store";
import {CompetitorService} from "../../../competitor/competitor.service";
import {selectAllCompetitors} from "../../../state/competitor/competitor.selectors";
import {deleteCompetitor, loadCompetitors, updateCompetitor} from "../../../state/competitor/competitor.actions";
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

    ngOnInit() {
        this.store.dispatch(loadCompetitors());
    }

    deleteCompetitor(competitor: Competitor) {
        this.store.dispatch(deleteCompetitor({competitor: competitor}));
    }

    updateCompetitor(competitor: Competitor) {
        this.store.dispatch(updateCompetitor({
            competitor: {
                ...CompetitorService.getRandomCompetitor(),
                id: competitor.id
            }
        }))
    }
}
