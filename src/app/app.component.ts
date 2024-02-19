import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './game/game.component';
import {LoginFormComponent} from "./Components/login-form/login-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameComponent, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pomo-level';
}
