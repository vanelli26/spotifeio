import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {BotaoMenuComponent} from '../botao-menu/botao-menu.component';

@Component({
  selector: 'app-painel-esquerdo',
  standalone: true,
  imports: [
    BotaoMenuComponent
  ],
  templateUrl: './painel-esquerdo.component.html',
  styleUrl: './painel-esquerdo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PainelEsquerdoComponent implements OnInit {

  ngOnInit(): void {

  }
}
