import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.routes').then(rota => rota.routes)
  }
];
