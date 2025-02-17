import {Component} from '@angular/core';
import {ControlsComponent} from "./controls/controls.component";
import {DataLoadingStatusComponent} from "./data-loading-status/data-loading-status.component";
import {CompetitorListComponent} from "./competitor-list/competitor-list.component";
import {MatchListComponent} from "./match-list/match-list.component";

@Component({
    selector: 'app-page',
    imports: [
        ControlsComponent,
        DataLoadingStatusComponent,
        CompetitorListComponent,
        MatchListComponent
    ],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss'
})
export class PageComponent {

}
