import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BackgroundComponent } from '../Components/background/background.component';
import { UiComponent } from '../Components/ui/ui.component';
import { CharacterComponent } from '../Components/character/character.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BackgroundComponent, UiComponent, CharacterComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  public GameStarted = false;
  public Minutes: number = 25;
  public Seconds: number = 0;
  private MinutesCache: number | null = null;
  private SecondsCache: number | null = null;
  public BreakDuration: number | null = null;
  public ShowContinuePopup: Subject<void> = new Subject<void>();

  //add a popup which asks the user if he she wants to continue or not
  //break needs to start from another place
  //add streaks?????
  private GameTick: Function = () => {
    this.Seconds -= 1;
    if (this.Seconds < 0) {
      this.Seconds = 59;
      this.Minutes -= 1;
    }
    if (!this.CheckTimeFinished()) {
      setTimeout(this.GameTick, 1000);
    }
    this.Minutes = 0;
    this.Seconds = 0;

    // this.StartBreak();
    this.ShowContinuePopup.next();
  };

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
    this.BreakDuration = this.Minutes / 5;
    this.GameStarted = true;
    this.Run();
  }

  public StartBreak(): void {
    if (this.GameStarted && this.BreakDuration) {
      this.Minutes = Math.round(this.BreakDuration);
    }
  }

  public ResetGame(): void {
    // this.Reset();
    this.GameStarted = false;
  }

  //add game logic
  //https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
  private Run(): void {
    setTimeout(this.GameTick, 1000);
  }
  private CheckTimeFinished(): boolean {
    if (this.Minutes === 0 && this.Seconds === 0) {
      return true;
    }
    return false;
  }

  private Reset(): void {}
  private Stop(): void {}
}
