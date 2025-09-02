import {ChangeDetectionStrategy, Component, input, OnInit} from "@angular/core";

@Component({
  selector: 'app-botao-menu',
  standalone: true,
  imports: [],
  templateUrl: './botao-menu.component.html',
  styleUrl: './botao-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotaoMenuComponent implements OnInit {

  nome = input.required<string>();

  ngOnInit(): void {

  }
}
