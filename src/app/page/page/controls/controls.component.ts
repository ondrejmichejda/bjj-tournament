import {Component, inject} from '@angular/core';
import {CompetitorService} from "../../../competitor/competitor.service";
import {Store} from "@ngrx/store";
import {addCompetitor, deleteCompetitorBulk} from "../../../state/competitor/competitor.actions";
import {selectAllCompetitors} from "../../../state/competitor/competitor.selectors";
import {take} from "rxjs";
import {MatchService} from "../../../match/match.service";
import {selectAllMatches} from "../../../state/match/match.selectors";
import {addMatch, deleteMatchBulk} from "../../../state/match/match.actions";

@Component({
    selector: 'app-controls',
    imports: [],
    templateUrl: './controls.component.html',
    styleUrl: './controls.component.scss'
})
export class ControlsComponent {

    private store = inject(Store);
    private matchSvc = inject(MatchService);

    /**
     * Creates a random competitor and dispatches an action to add it to the store.
     * Uses the CompetitorService to generate a random competitor.
     *
     * @return {void} Does not return a value.
     */
    createCompetitor(): void {
        this.store.dispatch(addCompetitor({competitor: CompetitorService.getRandomCompetitor()}));
    }

    /**
     * Clears the list of competitors by selecting all existing competitors from the store
     * and dispatching an action to delete them in bulk.
     *
     * @return {void} This method does not return a value.
     */
    clearCompetitors() {
        this.store.select(selectAllCompetitors)
            .pipe(take(1))
            .subscribe(competitors =>
                this.store.dispatch(deleteCompetitorBulk({competitors: competitors})));
    }

    /**
     * Creates and dispatches match data by calculating matches from the match service.
     *
     * The method uses a service to calculate matches and subsequently dispatches each match
     * to the store using the 'addMatch' action.
     *
     * @return {void} This method does not return any value.
     */
    createMatch(): void {
        // this.store.dispatch(addMatch({match: }));
        this.matchSvc.calculate().subscribe(matches => {
            matches.forEach(match => this.store.dispatch(addMatch({match: match})))
        })
    }


    /**
     * Clears all matches by selecting and retrieving the current matches
     * and dispatching an action to delete them in bulk.
     *
     * @return {void} Does not return a value.
     */
    clearMatches() {
        this.store.select(selectAllMatches)
            .pipe(take(1))
            .subscribe(matches =>
                this.store.dispatch(deleteMatchBulk({matches: matches})));
    }

    calculateMatches() {

    }
}
