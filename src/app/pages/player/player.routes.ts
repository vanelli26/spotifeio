import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./player.component')
        .then(p => p.PlayerComponent)
  }
];
