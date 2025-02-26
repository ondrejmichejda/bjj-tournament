import {Component} from '@angular/core';
import {DataLoadingStatusComponent} from "../../component/page/data-loading-status/data-loading-status.component";
import {ControlsComponent} from "../../component/page/controls/controls.component";
import {CompetitorListComponent} from "../../component/competitor-list/competitor-list.component";
import {MatchListComponent} from "../../component/match-list/match-list.component";

@Component({
    selector: 'app-page',
    imports: [
        DataLoadingStatusComponent,
        ControlsComponent,
        CompetitorListComponent,
        MatchListComponent
    ],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss'
})
export class PageComponent {

}
