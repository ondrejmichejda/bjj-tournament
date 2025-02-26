import {Routes} from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'competitors', pathMatch: 'full'},
    {
        path: 'competitors',
        loadComponent: () => import('./component/page/competitors/competitors.component').then(m => m.CompetitorsComponent)
    },
    {
        path: 'matches',
        loadComponent: () => import('./component/page/matches/matches.component').then(m => m.MatchesComponent)
    },
    {
        path: 'tournaments',
        loadComponent: () => import('./component/page/tournaments/tournaments.component').then(m => m.TournamentsComponent)
    },
    {
        path: 'origin',
        loadComponent: () => import('./page/page/page.component').then(m => m.PageComponent)
    },
    {
        path: 'not-found',
        loadComponent: () => import('./component/page/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
    {
        path: 'not-authorized',
        loadComponent: () => import('./component/page/not-authorized/not-authorized.component').then(m => m.NotAuthorizedComponent)
    },
    {
        path: '**',
        redirectTo: 'not-found'
    },
];
