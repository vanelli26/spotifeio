import { Injectable } from "@angular/core";
import { SpotifyConfiguration } from "../../enviroment/enviroment";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() {}

  async obterUrlLogin(): Promise<string> {

    const authPoint = `${SpotifyConfiguration.authEndpoint}?`;
  }
}
