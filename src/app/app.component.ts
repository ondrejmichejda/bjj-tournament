import {Component, inject, OnInit} from '@angular/core';
import {PageComponent} from "./page/page/page.component";
import {Store} from "@ngrx/store";
import {loadCompetitors} from "./state/competitor/competitor.actions";
import {loadMatches} from "./state/match/match.actions";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        PageComponent
    ],
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    private store = inject(Store);

    ngOnInit() {
        this.store.dispatch(loadCompetitors());
        this.store.dispatch(loadMatches());
    }
}

