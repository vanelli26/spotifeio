import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {inject} from '@angular/core';
import {SpotifyService} from '../services/spotify.service';

export const authGuard: CanActivateFn =
  async (rota, estado):
    Promise<boolean | UrlTree> => {

  const roteador = inject(Router);
  const spotifyService = inject(SpotifyService);
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    alert('Acesso negado. Por favor, faça login.');
    localStorage.removeItem('access_token');
    localStorage.removeItem('code_verifier');
    return roteador.parseUrl('/login');
  }

  await spotifyService.carregarUsuario();

  return true;
}
