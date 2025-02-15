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

    createRandomCompetitor() {
        this.store.dispatch(addCompetitor({competitor: CompetitorService.getRandomCompetitor()}));
    }
}
