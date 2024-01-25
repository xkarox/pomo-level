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
  public Minutes: number = 25;
  public Seconds: number = 0;

  //Change code so the ui sends a callback to the game component to change the hours like i did with the ui component
  //basically put all the logic in here and pass it to the ui component
  public SetMinutes(event: WheelEvent): void {
    if (!this.GameStarted) {
      if (event.deltaY > 0) {
        this.Minutes -= 1;
      } else if (event.deltaY < 0) {
        this.Minutes += 1;
      }

      if (this.Minutes < 0) {
        this.Minutes = 0;
      }

      if (this.Minutes >= 59) {
        this.Minutes = 59;
      }
    }
  }
  public SetSeconds(event: WheelEvent): void {
    if (!this.GameStarted) {
      if (event.deltaY > 0) {
        this.Seconds -= 1;
      } else if (event.deltaY < 0) {
        this.Seconds += 1;
      }

      if (this.Seconds < 0) {
        this.Seconds = 0;
      }

      if (this.Seconds >= 59) {
        this.Seconds = 59;
      }
    }
  }

  public StartGame(): void {
    this.GameStarted = true;
    this.Run();
  }

  public ResetGame(): void {
    // this.Reset();
    this.GameStarted = false;
  }

  //add game logic
  //https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
  private async Run(): Promise<void> {
    setTimeout(() => {}, 1000);
  }
  private Reset(): void {}
  private Stop(): void {}
}
