import {Component, inject, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadCompetitors} from "./state/competitor/competitor.actions";
import {loadMatches} from "./state/match/match.actions";
import {LayoutComponent} from "./component/layout/layout.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        LayoutComponent
    ],
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    private store = inject(Store);

    ngOnInit() {
        // subscribe to load data here
        this.store.dispatch(loadCompetitors());
        this.store.dispatch(loadMatches());
    }
}

