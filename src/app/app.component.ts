import {Component} from '@angular/core';
import {NewCompetitorFormComponent} from './component/new-competitor-form/new-competitor-form.component';
import {CompetitorsListComponent} from './component/competitors-list/competitors-list.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        NewCompetitorFormComponent,
        CompetitorsListComponent
    ],
    styleUrl: './app.component.scss'
})
export class AppComponent {
}
