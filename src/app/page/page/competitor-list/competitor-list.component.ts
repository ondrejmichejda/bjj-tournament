import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {Store} from "@ngrx/store";
import {CompetitorService} from "../../../competitor/competitor.service";
import {selectAllCompetitors} from "../../../state/competitor/competitor.selectors";
import {deleteCompetitor, loadCompetitors, updateCompetitor} from "../../../state/competitor/competitor.actions";
import {Competitor} from "../../../competitor/competitor";
import {tap} from "rxjs";

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
    competitors$ = this.store.select(selectAllCompetitors).pipe(
        tap(data => {
            console.log('new data', data);
        })
    );

    ngOnInit() {
        this.store.dispatch(loadCompetitors());
    }

    /**
     * Deletes a competitor from the store.
     *
     * @param {Competitor} competitor - The competitor object to be deleted.
     * @return {void} No return value.
     */
    deleteCompetitor(competitor: Competitor): void {
        this.store.dispatch(deleteCompetitor({competitor: competitor}));
    }

    /**
     * Updates the details of an existing competitor with a new competitor object.
     * Merges the provided competitor ID with a randomly generated competitor object.
     * Dispatches the updateCompetitor action to the store with the updated competitor data.
     *
     * @param {Competitor} competitor - The competitor object containing the ID to update and any additional details to
     *     utilize in the merge.
     * @return {void} Does not return a value.
     */
    updateCompetitor(competitor: Competitor): void {
        this.store.dispatch(updateCompetitor({
            competitor: {
                ...CompetitorService.getRandomCompetitor(),
                id: competitor.id,
                uid: competitor.uid
            }
        }))
    }
}
