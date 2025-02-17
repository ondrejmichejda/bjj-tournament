import {Component, inject} from '@angular/core';
import {AsyncPipe, NgStyle} from "@angular/common";
import {Store} from "@ngrx/store";
import {selectAllCompetitors} from "../../../state/competitor/competitor.selectors";
import {deleteCompetitor, updateCompetitor} from "../../../state/competitor/competitor.actions";
import {Competitor} from "../../../competitor/competitor";

@Component({
    selector: 'app-competitor-list',
    imports: [
        AsyncPipe,
        NgStyle
    ],
    templateUrl: './competitor-list.component.html',
    styleUrl: './competitor-list.component.scss'
})
export class CompetitorListComponent {

    private store = inject(Store);
    competitors$ = this.store.select(selectAllCompetitors);

    /**
     * Deletes a competitor from the store by dispatching the delete action.
     *
     * @param {Competitor} competitor - The competitor object to be deleted.
     * @return {void} No return value.
     */
    deleteCompetitor(competitor: Competitor): void {
        this.store.dispatch(deleteCompetitor({competitor: competitor}));
    }

    /**
     * Updates the information of a competitor by dispatching an action to the store.
     *
     * @param {Competitor} competitor - The competitor object to be updated.
     * @return {void} This method does not return a value.
     */
    updateCompetitor(competitor: Competitor): void {
        this.store.dispatch(updateCompetitor({
            competitor: {
                ...competitor,
                name: competitor.name + '+1'
            }
        }))
    }
}
