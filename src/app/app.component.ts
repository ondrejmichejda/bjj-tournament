import {Component, inject} from '@angular/core';
import {CompetitorService} from "./competitor/competitor.service";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {Competitor} from "./competitor/competitor";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        AsyncPipe
    ],
    styleUrl: './app.component.scss'
})
export class AppComponent {

    private competitorSvc = inject(CompetitorService);
    competitors$ = <Observable<Competitor[]>>this.competitorSvc.get();

    createRandomCompetitor() {
        this.competitorSvc.create(CompetitorService.getRandomCompetitor());
    }

    deleteCompetitor(competitor: Competitor) {
        this.competitorSvc.delete(competitor.id!);
    }

    updateCompetitor(competitor: Competitor) {
        this.competitorSvc.update({...CompetitorService.getRandomCompetitor(), id: competitor.id});
    }
}
