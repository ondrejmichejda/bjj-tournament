import {Component, inject} from '@angular/core';
import {CompetitorService} from '../../api/competitor.service';
import {AsyncPipe} from '@angular/common';

@Component({
               selector: 'app-competitors-list',
               imports: [
                   AsyncPipe
               ],
               templateUrl: './competitors-list.component.html',
               styleUrl: './competitors-list.component.scss'
           })
export class CompetitorsListComponent {

    public competitorSvc = inject(CompetitorService);

    delete(id: number | undefined) {
        this.competitorSvc.delete(id!);
    }
}
