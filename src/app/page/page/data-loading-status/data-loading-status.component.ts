import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectLoadCompetitorsStatus} from "../../../state/competitor/competitor.selectors";
import {AsyncPipe} from "@angular/common";
import {Status} from "../../../state/competitor/competitor.reducer";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
    selector: 'app-data-loading-status',
    imports: [
        AsyncPipe,
        MatProgressBar
    ],
    templateUrl: './data-loading-status.component.html',
    styleUrl: './data-loading-status.component.scss'
})
export class DataLoadingStatusComponent {

    protected readonly Status = Status;
    private store = inject(Store);
    status$ = this.store.select(selectLoadCompetitorsStatus);
}
