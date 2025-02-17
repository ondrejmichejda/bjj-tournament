import {Component, inject, input} from '@angular/core';
import {Competitor} from "../../../../competitor/competitor";
import {Store} from "@ngrx/store";
import { deleteCompetitor, updateCompetitor } from '../../../../state/competitor/competitor.actions';

@Component({
    selector: 'app-competitor',
    imports: [],
    templateUrl: './competitor.component.html',
    styleUrl: './competitor.component.scss'
})
export class CompetitorComponent {
    private store = inject(Store);
    competitor = input.required<Competitor>();

    deleteCompetitor(): void {
        this.store.dispatch(deleteCompetitor({competitor: this.competitor()}));
    }

    updateCompetitor(): void {
        this.store.dispatch(updateCompetitor({
            competitor: {
                ...this.competitor(),
                name: this.competitor().name + '+1'
            }
        }))
    }
}
