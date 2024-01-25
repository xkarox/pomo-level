import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HelperService } from '../../Services/helper.service';
import { TimerValues } from '../../Types/timer-values';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-ui',
  standalone: true,
  imports: [],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css',
  providers: [HelperService],
})
export class UiComponent implements OnInit {
  @Output() PressStartEvent = new EventEmitter<void>();
  @Output() PressResetEvent = new EventEmitter<void>();
  @Output() MinutesChangedEvent = new EventEmitter<WheelEvent>();
  @Output() SecondsChangedEvent = new EventEmitter<WheelEvent>();
  @Input() Minutes: number = 25;
  @Input() Seconds: number = 0;
  private ShowContinuePopupEventSub!: Subscription;
  @Input()
  ShowContinuePopup!: Observable<void>;
  ngOnInit(): void {
    this.ShowContinuePopupEventSub = this.ShowContinuePopup.subscribe(() =>
      this.DisplayContinuePopup()
    );
    this.AddEventListeners();
  }

  ngOnDestroy(): void {
    this.ShowContinuePopupEventSub.unsubscribe();
  }

  constructor(private helperService: HelperService) {}

  private AddEventListeners() {
    const minutesElement = document.getElementById('minutes');
    if (minutesElement) {
      minutesElement.addEventListener('wheel', (event: WheelEvent) =>
        this.MinutesChangedEvent.emit(event)
      );
    }

    const secondsElement = document.getElementById('seconds');
    if (secondsElement) {
      secondsElement.addEventListener('wheel', (event: WheelEvent) =>
        this.SecondsChangedEvent.emit(event)
      );
    }
  }

  public GetMinutesString(): string {
    switch (true) {
      case this.Minutes <= 0:
        return '00';
      case this.Minutes < 10:
        return '0' + this.Minutes.toString();
      case this.Minutes >= 59:
        return '59';
      default:
        return this.Minutes.toString();
    }
  }

  public GetSecondsString(): string {
    switch (true) {
      case this.Seconds <= 0:
        return '00';
      case this.Seconds < 10:
        return '0' + this.Seconds.toString();
      case this.Seconds >= 59:
        return '59';
      default:
        return this.Seconds.toString();
    }
  }

  public DisplayContinuePopup() {
    const continuePopup = document.getElementById('continue-popup-container');
    if (continuePopup) {
      continuePopup.style.display = 'flex';
    }
  }

  public StartButtonPressed() {
    this.PressStartEvent.emit();
  }

  public ResetButtonPressed() {
    this.PressResetEvent.emit();
  }
}
