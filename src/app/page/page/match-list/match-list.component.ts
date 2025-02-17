import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";
import {selectAllMatches} from "../../../state/match/match.selectors";
import {Match} from "../../../match/match";

@Component({
    selector: 'app-match-list',
    imports: [
        AsyncPipe
    ],
    templateUrl: './match-list.component.html',
    styleUrl: './match-list.component.scss'
})
export class MatchListComponent {

    private store = inject(Store);
    matches$ = this.store.select(selectAllMatches);

    /**
     * Logs the details of the provided match object to the console.
     *
     * @param {Match} match - The match object containing the details to be logged.
     * @return {void} This method does not return a value.
     */
    matchDetails(match: Match) {
        console.log(match);
    }
}
