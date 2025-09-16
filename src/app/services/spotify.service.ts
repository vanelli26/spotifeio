import {inject, Injectable} from "@angular/core";
import {SpotifyConfiguration} from "../../enviroment/enviroment";
import SpotifyWebApi from 'spotify-web-api-js';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi = new SpotifyWebApi();
  usuario: SpotifyApi.CurrentUsersProfileResponse | null = null;
  roteador = inject(Router);

  constructor() {}

  async obterUrlLogin(): Promise<string> {

    const codigoAleatorio = await this.gerarCodigoAleatorio();
    const authPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const urlRedirect = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const codeChallengeMethod = 'code_challenge_method=S256&';
    const codeChallengeParam = 'code_challenge=' + codigoAleatorio + '&';
    const responseType = 'response_type=code';

    return `${authPoint}${clientId}${urlRedirect}${scopes}${codeChallengeMethod}${codeChallengeParam}${responseType}`;
  }

  async gerarCodigoAleatorio() {
    const codigoVerificador = this.gerarCodigoVerificador(128);
    const codChallenge = await this.generateCodeChallenge(codigoVerificador);

    localStorage.setItem('code_verifier', codigoVerificador);

    return codChallenge;
  }

  gerarCodigoVerificador(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  }

  async definirAcesstoken(code: string) {
    const codeVerifier = localStorage.getItem('code_verifier');

    const tokenEndpoint = SpotifyConfiguration.apiTokenEndpoint;
    const params = new URLSearchParams();
    params.append("client_id", SpotifyConfiguration.clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", SpotifyConfiguration.redirectUrl);
    params.append("code_verifier", codeVerifier!);

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      const dados = await response.json();
      const acessToken = dados.access_token;

      if (acessToken) {
        this.spotifyApi.setAccessToken(acessToken);
        localStorage.setItem('access_token', acessToken);
        this.usuario = await this.spotifyApi.getMe();
        return !!this.usuario;
      } else {
        console.error('Falha ao obter o token de acesso');
        return false;
      }
    } catch (error) {
      console.error('Ocorreu um erro ao obter o token de acesso:', error);
      return false;
    }
  }

  async carregarPlaylists(offset = 0, limit = 50): Promise<SpotifyApi.PlaylistObjectSimplified[]> {
    const acessToken = localStorage.getItem('access_token');
    if (!acessToken) {
      return [];
    }

    try {
      this.spotifyApi.setAccessToken(acessToken);
      const playlists =
        await this.spotifyApi.getUserPlaylists(this.usuario!.id, {offset, limit});

      return playlists.items as SpotifyApi.PlaylistObjectSimplified[] ?? [];
    } catch (error) {
      console.error('Ocorreu um erro ao obter as playlists:', error);
      return [];
    }
  }

  async carregarUsuario() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return null;
    }

    try {
      this.spotifyApi.setAccessToken(accessToken);
      const me = await this.spotifyApi.getMe();
      this.usuario = me as SpotifyApi.CurrentUsersProfileResponse;
      return this.usuario;
    } catch (e) {
      console.error('Não foi possível carregar o usuário Spotify:', e);
      this.usuario = null;
      return null;
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('code_verifier');
    this.usuario = null;
    this.spotifyApi.setAccessToken('');
    this.roteador.navigate(['/login']);
  }
}
