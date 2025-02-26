import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";
import {selectAllMatches} from "../../state/match/match.selectors";
import {MatchComponent} from "./match/match.component";

@Component({
    selector: 'app-match-list',
    imports: [
        AsyncPipe,
        MatchComponent
    ],
    templateUrl: './match-list.component.html',
    styleUrl: './match-list.component.scss'
})
export class MatchListComponent {
    private store = inject(Store);
    matches$ = this.store.select(selectAllMatches);
}
