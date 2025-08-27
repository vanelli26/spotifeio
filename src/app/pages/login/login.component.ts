import {ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import {SpotifyService} from "../../services/spotify.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  roteador = inject(Router);

  ngOnInit(): void {
    this.verficarCodigoUrlCallback();
  }

  serviceSpotify = inject(SpotifyService);
  anoAtual = new Date().getFullYear();

  async fazerLogin() {
    const url = await this.serviceSpotify.obterUrlLogin();
    window.location.href = url;
  }

  async verficarCodigoUrlCallback() {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("code");

    if (codigo) {
      const sucesso = await this.serviceSpotify.definirAcesstoken(codigo);

      if (sucesso) {
        this.roteador.navigate(['/player']);
      }
    }
  }
}
