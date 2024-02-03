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
export class GameComponent implements OnInit {
  public GameStarted = false;
  public OnBreak = false;
  public Minutes: number = 25;
  public Seconds: number = 0;
  private MinutesCache: number | null = null;
  private SecondsCache: number | null = null;
  public BreakDuration: number | null = null;
  public ShowContinuePopup: Subject<void> = new Subject<void>();
  public CloseContinuePopup: Subject<void> = new Subject<void>();
  public StartRunningAnimationEvent = new EventEmitter<void>();
  public StartIdleAnimationEvent = new EventEmitter<void>();

  ngOnInit(): void {
    this.CopyTimeToCache();
  }

  //add streaks?????
  private GameTick: Function = () => {
    if (this.GameStarted) {
      if (!this.OnBreak) {
        this.RunNormalLogic();
      }

      if (this.OnBreak) {
        this.RunBreakLogic();
      }
    }
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
    if (!this.GameStarted) {
      this.GameStarted = true;
      this.SetBreakDuration();
      this.CopyTimeToCache();
      this.StartRunningAnimationEvent.emit();
      this.Run();
    }
  }
  public StartBreak(): void {
    if (this.GameStarted) {
      setTimeout(() => {
        this.OnBreak = true;
        this.Minutes = Math.round(this.BreakDuration!);
        this.StartIdleAnimationEvent.emit();
        this.Run();
      }, 1000);
    }
  }
  public ResetGame(): void {
    this.GameStarted = false;
    this.StartIdleAnimationEvent.emit();
    this.Reset();
  }
  private Run(): void {
    setTimeout(this.GameTick, 1000);
  }
  private CheckTimeFinished(): boolean {
    if (this.Minutes === 0 && this.Seconds === 0) {
      return true;
    }
    return false;
  }

  private CopyTimeToCache(): void {
    this.MinutesCache = this.Minutes;
    this.SecondsCache = this.Seconds;
  }

  private CopyCacheToTime(): void {
    this.Minutes = this.MinutesCache!;
    this.Seconds = this.SecondsCache!;
  }

  private SetBreakDuration(): void {
    this.BreakDuration = this.Minutes / 5;
  }

  public ContinueGame() {
    this.OnBreak = false;
    this.CopyCacheToTime();
    this.CloseContinuePopup.next();
    this.StartRunningAnimationEvent.emit();
    this.Run();
  }

  public AbortGame() {
    this.OnBreak = false;
    this.GameStarted = false;
    this.CopyCacheToTime();
    this.StartIdleAnimationEvent.emit();
    this.CloseContinuePopup.next();
  }

  private Reset(): void {
    this.CopyCacheToTime();
    this.GameStarted = false;
  }

  private RunBreakLogic() {
    this.Seconds -= 1;
    if (this.Seconds < 0) {
      this.Seconds = 59;
      this.Minutes -= 1;
    }
    if (this.Minutes < 0) {
      this.Minutes = 0;
    }
    if (this.CheckTimeFinished()) {
      this.Minutes = 0;
      this.Seconds = 0;

      this.ShowContinuePopup.next();
    } else {
      setTimeout(this.GameTick, 1000);
    }
  }

  private RunNormalLogic() {
    this.Seconds -= 1;
    if (this.Seconds < 0) {
      this.Seconds = 59;
      if (this.Minutes > 0) {
        this.Minutes -= 1;
      }
    }

    if (this.CheckTimeFinished()) {
      this.Minutes = 0;
      this.Seconds = 0;

      this.StartBreak();
    } else {
      setTimeout(this.GameTick, 1000);
    }
  }
}
