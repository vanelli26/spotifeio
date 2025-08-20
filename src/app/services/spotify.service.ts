import { Injectable } from "@angular/core";
import { SpotifyConfiguration } from "../../enviroment/enviroment";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() {}

  async obterUrlLogin(): Promise<string> {
    const codigoAleatorio = await this.gerarCodigoAleatorio();
    const authPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const urlRedirect = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}`;
    const codeChallengeMethod = 'code_challenge_method=S256';
    const codeChallengeParam = 'code_challenge' + codigoAleatorio + '&';
    const responseType = 'response_type=code';

    return `${authPoint}${clientId}${urlRedirect}${scopes}
      ${codeChallengeMethod}${codeChallengeParam}${responseType}`;
  }

  async gerarCodigoAleatorio() {
    // const codigoVerificador = this.gerarCodigoVerificador(128);
    // const codChallenge = await this.gerarHash(codigoVerificador);

    return ''; //codChallenge;
  }
}
