import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from './background/background.component';
import { UiComponent } from './ui/ui.component';
import { CharacterComponent } from './character/character.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BackgroundComponent, UiComponent, CharacterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pomo-level';
}
