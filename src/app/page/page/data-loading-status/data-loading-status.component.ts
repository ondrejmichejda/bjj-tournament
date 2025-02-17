import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectCompetitorError, selectCompetitorStatus} from "../../../state/competitor/competitor.selectors";
import {AsyncPipe} from "@angular/common";
import {Status} from '../../../base/base-state';

@Component({
    selector: 'app-data-loading-status',
    imports: [
        AsyncPipe
    ],
    templateUrl: './data-loading-status.component.html',
    styleUrl: './data-loading-status.component.scss'
})
export class DataLoadingStatusComponent {

    protected readonly Status = Status;
    private store = inject(Store);
    status$ = this.store.select(selectCompetitorStatus);
    error$ = this.store.select(selectCompetitorError);
}
