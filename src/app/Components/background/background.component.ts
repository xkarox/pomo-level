import { Component, Input, OnInit } from '@angular/core';
import { CharacterComponent } from '../character/character.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CharacterComponent],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css',
})
export class BackgroundComponent implements OnInit {
  @Input() StartRunningAnimationEvent!: Observable<void>;
  private StartRunningAnimationEventSub!: Subscription;
  @Input() StartIdleAnimationEvent!: Observable<void>;
  private StartIdleAnimationEventSub!: Subscription;
  ngOnInit(): void {
    const elements = document.getElementsByClassName('m-scroll');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.classList.add('animate');
    }

    const demonWoods = document.getElementById('demon-woods');
    if (demonWoods) {
      demonWoods.classList.add('none-display');
    }

    this.StartRunningAnimationEventSub =
      this.StartRunningAnimationEvent.subscribe(() => {
        this.FadeOut();
        setTimeout(() => {
          this.ChangeBackground('woods');
        }, 2000);
      });

    this.StartIdleAnimationEventSub = this.StartIdleAnimationEvent.subscribe(
      () => {
        this.FadeOut();
        setTimeout(() => {
          this.ChangeBackground('demon-woods');
        }, 2000);
      }
    );
  }

  private ChangeBackground(comingFrom: string) {
    const woodsElements = document.getElementById('woods');
    const demonWoodsElements = document.getElementById('demon-woods');

    if (woodsElements && demonWoodsElements) {
      if (comingFrom == 'demon-woods') {
        demonWoodsElements.classList.add('none-display');
        woodsElements.classList.remove('none-display');
        woodsElements.classList.add('display');
      }

      if (comingFrom == 'woods') {
        woodsElements.classList.add('none-display');
        demonWoodsElements.classList.remove('none-display');
        demonWoodsElements.classList.add('display');
      }
    }
  }

  private FadeOut() {
    const blackOverlay = document.getElementById('black-overlay');
    if (blackOverlay) {
      blackOverlay.style.opacity = '100%';
      setTimeout(() => {
        blackOverlay.style.opacity = '0%';
      }, 2000);
    }
  }
}
