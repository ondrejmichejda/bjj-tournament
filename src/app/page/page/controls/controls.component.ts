import {Component, inject} from '@angular/core';
import {CompetitorService} from "../../../competitor/competitor.service";
import {Store} from "@ngrx/store";
import {addCompetitor} from "../../../state/competitor/competitor.actions";

@Component({
    selector: 'app-controls',
    imports: [],
    templateUrl: './controls.component.html',
    styleUrl: './controls.component.scss'
})
export class ControlsComponent {

    private store = inject(Store);

    /**
     * Creates a random competitor and dispatches an action to add it to the store.
     * Uses the CompetitorService to generate a random competitor.
     *
     * @return {void} Does not return a value.
     */
    createRandomCompetitor(): void {
        this.store.dispatch(addCompetitor({competitor: CompetitorService.getRandomCompetitor()}));
    }
}
