import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private matSnackBar = inject(MatSnackBar);

    constructor() {
    }

    error() {
        this.matSnackBar.open(
            'Vyskytla sa chyba.',
            'Zavřít',
            {
                duration: 1000,
            });
    }
}
