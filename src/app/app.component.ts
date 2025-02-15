import {Component} from '@angular/core';
import {PageComponent} from "./page/page/page.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        PageComponent
    ],
    styleUrl: './app.component.scss'
})
export class AppComponent {
}

