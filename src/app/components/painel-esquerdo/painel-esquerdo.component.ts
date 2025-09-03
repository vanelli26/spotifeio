import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {BotaoMenuComponent} from '../botao-menu/botao-menu.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faHome, faSearch, faUser} from '@fortawesome/free-solid-svg-icons';

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

  ngOnInit(): void {

  }
}
