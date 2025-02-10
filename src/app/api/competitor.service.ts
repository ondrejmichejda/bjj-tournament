import {Injectable} from '@angular/core';
import {Competitor} from '../model/competitor';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
                providedIn: 'root'
            })
export class CompetitorService {

    competitors = new BehaviorSubject<Competitor[]>([]);

    constructor() {
    }

    create(competitor: Competitor): Observable<Competitor> {
        competitor.id = this.competitors.value.length + 1;
        this.competitors.next([...this.competitors.value, competitor]);
        return of(competitor);
    }

    delete(competitorId: number): Observable<boolean> {
        this.competitors.next(this.competitors.value.filter(competitor => competitor.id !== competitorId));
        return of(true);
    }
}
