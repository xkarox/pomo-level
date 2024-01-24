import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HelperService } from '../../Services/helper.service';
import { TimerValues } from '../../Types/timer-values';

@Component({
  selector: 'app-ui',
  standalone: true,
  imports: [],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css',
  providers: [HelperService],
})
export class UiComponent implements OnInit {
  public Hours: number = 0;
  public Minutes: number = 25;
  public HoursString: string = '';
  public MinutesString: string = '';

  @Output() PressStartEvent = new EventEmitter<Date>();
  @Output() PressResetEvent = new EventEmitter<void>();
  @Input() TimerRunning = false;

  ngOnInit(): void {
    this.SetHoursString();
    this.SetMinutesString();
    this.AddEventListeners();
  }

  constructor(private helperService: HelperService) {}
  private ChangeTime(event: WheelEvent, valueToChange: TimerValues) {
    if (!this.TimerRunning) {
      if (valueToChange == TimerValues.Hours) {
        if (event.deltaY > 0) {
          this.Hours -= 1;
        } else if (event.deltaY < 0) {
          this.Hours += 1;
        }
        this.SetHoursString();
      } else if (valueToChange == TimerValues.Minutes) {
        if (event.deltaY > 0) {
          this.Minutes -= 1;
        } else if (event.deltaY < 0) {
          this.Minutes += 1;
        }
        this.SetMinutesString();
      }
    }
  }
  private AddEventListeners() {
    const hoursElement = document.getElementById('hours');
    if (hoursElement) {
      hoursElement.addEventListener('wheel', (event) =>
        this.ChangeTime(event, TimerValues.Hours)
      );
    }

    const minutesElement = document.getElementById('minutes');
    if (minutesElement) {
      minutesElement.addEventListener('wheel', (event) =>
        this.ChangeTime(event, TimerValues.Minutes)
      );
    }
  }

  private RemoveEventListeners() {
    const hoursElement = document.getElementById('hours');
    if (hoursElement) {
      hoursElement.removeEventListener('wheel', (event) =>
        this.ChangeTime(event, TimerValues.Hours)
      );
    }

    const minutesElement = document.getElementById('minutes');
    if (minutesElement) {
      minutesElement.removeEventListener('wheel', (event) =>
        this.ChangeTime(event, TimerValues.Minutes)
      );
    }
  }

  public SetHoursString() {
    switch (true) {
      case this.Hours <= 0:
        this.Hours = 0;
        this.HoursString = '00';
        break;
      case this.Hours < 10:
        this.HoursString = '0' + this.Hours;
        break;
      case this.Hours >= 23:
        this.Hours = 23;
        this.HoursString = '23';
        break;
      default:
        this.HoursString = '' + this.Hours;
        break;
    }
  }

  public SetMinutesString() {
    switch (true) {
      case this.Minutes <= 0:
        this.Minutes = 0;
        this.MinutesString = '00';
        break;
      case this.Minutes < 10:
        this.MinutesString = '0' + this.Minutes;
        break;
      case this.Minutes >= 59:
        this.Minutes = 59;
        this.MinutesString = '59';
        break;
      default:
        this.MinutesString = '' + this.Minutes;
        break;
    }
  }

  public Start() {
    const now = Date.now();
    const cycleEndTime = new Date(
      now.valueOf() + this.Hours * 3600000 + this.Minutes * 60000
    );
    this.RemoveEventListeners();
    this.PressStartEvent.emit(cycleEndTime);
  }

  public Reset() {
    this.Hours = 0;
    this.SetHoursString();
    this.Minutes = 25;
    this.SetMinutesString();
    this.PressResetEvent.emit();
  }
}
