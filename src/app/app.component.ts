import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from './Components/background/background.component';
import { UiComponent } from './Components/ui/ui.component';
import { CharacterComponent } from './Components/character/character.component';
import { EngineComponent } from './Components/engine/engine.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EngineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pomo-level';
}
