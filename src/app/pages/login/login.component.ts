import {ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    this.verficarCodigoUrlCallback();
  }

  serviceSpotify = inject(SpotifyService);
  anoAtual = new Date().getFullYear();

  async fazerLogin() {
    const url = await this.serviceSpotify.obterUrlLogin();
    window.location.href = url;
  }

  verficarCodigoUrlCallback() {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("code");

    if (codigo) {
      const sucesso = this.serviceSpotify.definirAcesstoken(codigo);
    }
  }
}
