import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent implements OnInit {
  private charIdleSteps = 5;
  private charRunningSteps = 6;
  private charFrameTime = '0.75%';
  private charAnimationIdle = 'Idle';
  private charAnimationRunning = 'Running';
  private StartRunningAnimationEventSub!: Subscription;
  @Input()
  StartRunningAnimationEvent!: Observable<void>;
  private StartIdleAnimationEventSub!: Subscription;
  @Input()
  StartIdleAnimationEvent!: Observable<void>;

  ngOnInit(): void {
    const char = document.getElementById('char');
    if (char) {
      char.style.background = `url('assets/img/char/adventurer/adventurer_Idle.png')`;
      char.style.height = '32px';
      char.style.width = '32px';
      char.style.scale = '10';
      char.classList.add('animate-idle');
    }

    this.StartRunningAnimationEventSub =
      this.StartRunningAnimationEvent.subscribe(() =>
        this.Animate(this.charAnimationRunning)
      );
    this.StartIdleAnimationEventSub = this.StartIdleAnimationEvent.subscribe(
      () => this.Animate(this.charAnimationIdle)
    );
  }

  //jump after random time or a message or something
  Animate(animation: string) {
    const char = document.getElementById('char');
    if (char) {
      char.classList.remove('animate-idle');
      char.classList.remove('animate-running');

      switch (animation) {
        case this.charAnimationIdle:
          // char.style.background = `url('assets/img/char/adventurer/adventurer_Idle.png')`;
          // char.classList.add('animate-idle');
          char.classList.add('animate-exit-screen');
          setTimeout(() => {
            char.classList.remove('animate-exit-screen');
            char.classList.add('left-screen');

            char.classList.add('animate-enter-screen');
            char.classList.remove('demon-woods-char');
            setTimeout(() => {
              char.classList.remove('left-screen');
              char.classList.remove('animate-enter-screen');
              char.classList.add('animate-idle');
            }, 2000);
          }, 2000);

          break;
        case this.charAnimationRunning:
          char.style.background = `url('assets/img/char/adventurer/Adventurer_Running.png')`;
          char.classList.add('animate-exit-screen');
          setTimeout(() => {
            char.classList.remove('animate-exit-screen');
            char.classList.add('left-screen');

            char.classList.add('animate-enter-screen');
            char.classList.add('demon-woods-char');
            setTimeout(() => {

              char.classList.remove('left-screen');
              char.classList.remove('animate-enter-screen');
              char.classList.add('animate-running');
            }, 2000);
          }, 2000);

          break;
        default:
          char.style.background = `url('assets/img/char/adventurer/adventurer_Idle.png')`;
          break;
      }
    }
  }
}
