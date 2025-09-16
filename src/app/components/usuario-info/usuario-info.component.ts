import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faSignOut} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuario-info',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './usuario-info.component.html',
  styleUrl: './usuario-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioInfoComponent implements OnInit {

  usuario = signal<SpotifyApi.CurrentUsersProfileResponse | null>(null);
  spotifyService = inject(SpotifyService);

  ngOnInit() {
    this.usuario.set(this.spotifyService.usuario);
  }

  protected readonly faSignOut = faSignOut;

  logout() {
    this.spotifyService.logout();
  }
}
