import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private matSnackBar = inject(MatSnackBar);

    /**
     * Displays an error message using the matSnackBar service.
     *
     * @param {string} msg - The error message to display.
     * @return {void} This method does not return a value.
     */
    error(msg: string): void {
        this.matSnackBar.open(
            msg,
            'Zavřít',
            {
                duration: 1000,
            });
    }
}
