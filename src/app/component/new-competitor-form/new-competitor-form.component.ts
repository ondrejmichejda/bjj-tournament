import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Competitor} from '../../model/competitor';
import {CompetitorService} from '../../api/competitor.service';

@Component({
    selector: 'app-new-competitor-form',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './new-competitor-form.component.html',
    styleUrl: './new-competitor-form.component.scss'
})
export class NewCompetitorFormComponent {

    private competitorSvc = inject(CompetitorService);

    formGroup = new FormGroup({
        name: new FormControl(),
        weight: new FormControl(),
        belt: new FormControl()
    });

    onSubmit() {
        const competitor = new Competitor(
            this.formGroup.get('name')?.value,
            this.formGroup.get('weight')?.value,
            this.formGroup.get('belt')?.value,
        );

        this.competitorSvc.create(competitor).subscribe();
    }
}
