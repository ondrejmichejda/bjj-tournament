import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {provideStore} from '@ngrx/store';
import {competitorReducer} from "./state/competitor/competitor.reducer";
import {provideEffects} from '@ngrx/effects';
import {CompetitorEffects} from "./state/competitor/competitor.effects";
import {environment} from "../environments/environment";
import {matchReducer} from "./state/match/match.reducer";
import {MatchEffects} from "./state/match/match.effects";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideFirebaseApp(() => initializeApp({
            'projectId': `${environment.firestore.projectId}`,
            'appId': `${environment.firestore.appId}`,
            'storageBucket': `${environment.firestore.storageBucket}`,
            'apiKey': `${environment.firestore.apiKey}`,
            'authDomain': `${environment.firestore.authDomain}`,
            'messagingSenderId': `${environment.firestore.messagingSenderId}`
        })),
        provideFirestore(() => getFirestore()),
        provideStore({
            competitors: competitorReducer,
            matches: matchReducer
        }),
        provideEffects(CompetitorEffects, MatchEffects)
    ]
};
