import {Component, inject} from '@angular/core';
import {CompetitorService} from "../../../competitor/competitor.service";

@Component({
    selector: 'app-controls',
    imports: [],
    templateUrl: './controls.component.html',
    styleUrl: './controls.component.scss'
})
export class ControlsComponent {

    private competitorSvc = inject(CompetitorService);

    createRandomCompetitor() {
        this.competitorSvc.create(CompetitorService.getRandomCompetitor());
    }
}
