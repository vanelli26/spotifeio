import {ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import {BotaoMenuComponent} from '../botao-menu/botao-menu.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faHome, faMusic, faSearch, faUser} from '@fortawesome/free-solid-svg-icons';
import {SpotifyService} from '../../services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  standalone: true,
  imports: [
    BotaoMenuComponent,
    FaIconComponent
  ],
  templateUrl: './painel-esquerdo.component.html',
  styleUrl: './painel-esquerdo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PainelEsquerdoComponent implements OnInit {

  faHome = faHome;
  faSearch = faSearch;
  faUser = faUser;
  faMusic = faMusic;

  menuSelecionado: string = 'Inicio';
  playlists: SpotifyApi.PlaylistObjectSimplified[] = [];
  spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.carregarPlaylists();
  }

  async carregarPlaylists() {
    this.playlists = await this.spotifyService.carregarPlaylists();
    console.log(this.playlists);
  }
}
