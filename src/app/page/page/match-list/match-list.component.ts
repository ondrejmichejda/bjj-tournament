import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";
import {selectAllMatches} from "../../../state/match/match.selectors";
import {tap} from "rxjs";
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
    matches$ = this.store.select(selectAllMatches).pipe(
        tap(matches => console.log(matches))
    )

    matchDetails(match: Match) {
        console.log(match);
    }
}
