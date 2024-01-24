import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
export class GameComponent {
  public GameStarted = false;
  public CycleRemainingTime: Date = new Date();
  public CylceEndTime!: Date;

  public StartGame(cycleEndTime: Date): void {
    this.CylceEndTime = cycleEndTime;
    // this.Start();
    this.GameStarted = true;
  }

  public ResetGame(): void {
    // this.Reset();
    this.GameStarted = false;
  }

  private Run(): void {
    var now = new Date();
    if (now < this.CylceEndTime) {
    }
  }
  private Reset(): void {}
  private Stop(): void {}
}
