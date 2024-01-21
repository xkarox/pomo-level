import { Component, OnInit } from '@angular/core';

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
  ngOnInit(): void {
    const char = document.getElementById('char');
    if (char) {
      char.style.background = `url('assets/img/char/adventurer/adventurer_Idle.png')`;
      char.style.height = '32px';
      char.style.width = '32px';
      char.style.scale = '10';
      char.classList.add('animate-idle');
    }
  }

  Animate(animation: string) {
    const char = document.getElementById('char');
    if (char) {
      char.classList.remove('animate-idle');
      char.classList.remove('animate-running');

      switch (animation) {
        case this.charAnimationIdle:
          char.style.background = `url('assets/img/char/adventurer/adventurer_Idle.png')`;
          char.classList.add('animate-idle');
          break;
        case this.charAnimationRunning:
          char.style.background = `url('assets/img/char/adventurer/Adventurer_Running.png')`;
          char.classList.add('animate-running');
          break;
        default:
          char.style.background = `url('assets/img/char/adventurer/adventurer_Idle.png')`;
          break;
      }
    }
  }
}
