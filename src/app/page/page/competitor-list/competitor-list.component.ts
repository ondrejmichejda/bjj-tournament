import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {Store} from "@ngrx/store";
import {selectAllCompetitors} from "../../../state/competitor/competitor.selectors";
import {CompetitorComponent} from "./competitor/competitor.component";

@Component({
    selector: 'app-competitor-list',
    imports: [
        AsyncPipe,
        CompetitorComponent
    ],
    templateUrl: './competitor-list.component.html',
    styleUrl: './competitor-list.component.scss'
})
export class CompetitorListComponent {

    private store = inject(Store);
    competitors$ = this.store.select(selectAllCompetitors);
}
