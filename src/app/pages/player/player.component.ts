import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {

  ngOnInit(): void {

  }
}
