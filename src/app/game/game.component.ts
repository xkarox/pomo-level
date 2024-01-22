import { Component } from '@angular/core';
import { BackgroundComponent } from '../Components/background/background.component';
import { UiComponent } from '../Components/ui/ui.component';
import { CharacterComponent } from '../Components/character/character.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BackgroundComponent, UiComponent, CharacterComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {}
