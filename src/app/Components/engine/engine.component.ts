import { Component, OnInit } from '@angular/core';
import { BackgroundComponent } from '../background/background.component';
import { UiComponent } from '../ui/ui.component';
import { CharacterComponent } from '../character/character.component';
import { EngineController } from '../../Controllers/engine-controller';

@Component({
  selector: 'app-engine',
  standalone: true,
  imports: [BackgroundComponent, UiComponent, CharacterComponent],
  templateUrl: './engine.component.html',
  styleUrl: './engine.component.css',
})
export class EngineComponent implements OnInit {
  public engineController: EngineController = new EngineController();
  ngOnInit(): void {}
}
