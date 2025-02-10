import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {provideStore} from '@ngrx/store';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({
                                                                             "projectId": "bjjtournament-4538b",
                                                                             "appId": "1:1012794337509:web:8cf044ab0853b812460c0c",
                                                                             "storageBucket": "bjjtournament-4538b.firebasestorage.app",
                                                                             "apiKey": "AIzaSyBLTBSPgxF_PWyzQpIOGb5Uu9Ggs-IO3Ss",
                                                                             "authDomain": "bjjtournament-4538b.firebaseapp.com",
                                                                             "messagingSenderId": "1012794337509"
                                                                         })), provideFirestore(() => getFirestore()),
        provideStore()
    ]
};
