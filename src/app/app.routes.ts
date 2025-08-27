import {Routes} from '@angular/router';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.routes').then(rota => rota.routes)
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.routes').then(rota => rota.routes),
    canActivate: [authGuard]
  }
];
