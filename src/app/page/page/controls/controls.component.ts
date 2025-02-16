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
     * Creates a random competitor and adds it to the store.
     * This method dispatches an action to add a competitor with randomly generated data
     * by utilizing the CompetitorService's functionality.
     *
     * @return {void} Does not return a value.
     */
    createRandomCompetitor(): void {
        this.store.dispatch(addCompetitor({competitor: CompetitorService.getRandomCompetitor()}));
    }

    clear(): void {

    }
}
