import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from "@angular/core";
import {BotaoMenuComponent} from '../botao-menu/botao-menu.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faHome, faSearch, faUser} from '@fortawesome/free-solid-svg-icons';
import {SpotifyService} from '../../services/spotify.service';
import {UsuarioInfoComponent} from '../usuario-info/usuario-info.component';

@Component({
  selector: 'app-painel-esquerdo',
  standalone: true,
  imports: [
    BotaoMenuComponent,
    FaIconComponent,
    UsuarioInfoComponent
  ],
  templateUrl: './painel-esquerdo.component.html',
  styleUrl: './painel-esquerdo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PainelEsquerdoComponent implements OnInit {

  faHome = faHome;
  faSearch = faSearch;
  faUser = faUser;

  menuSelecionado: string = 'Inicio';
  playlists = signal<SpotifyApi.PlaylistObjectSimplified[]>([]);
  spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.carregarPlaylists();
  }

  async carregarPlaylists() {
    this.playlists.set(await this.spotifyService.carregarPlaylists());
  }
}
