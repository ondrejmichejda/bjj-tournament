import {Component, input} from '@angular/core';
import {Match} from "../../../model/match/match";
import {CompetitorComponent} from "../../competitor-list/competitor/competitor.component";

@Component({
    selector: 'app-match',
    imports: [
        CompetitorComponent
    ],
    templateUrl: './match.component.html',
    styleUrl: './match.component.scss'
})
export class MatchComponent {
    match = input.required<Match>();
}
