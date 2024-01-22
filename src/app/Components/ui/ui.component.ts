import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui',
  standalone: true,
  imports: [],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css',
})
export class UiComponent implements OnInit {
  public Hours: number = 0;
  public Minutes: number = 0;
  public HoursString: string = '';
  public MinutesString: string = '';
  ngOnInit(): void {
    this.SetHoursString();
    this.SetMinutesString();
  }
  public HoursHandler() {
    const hoursElement = document.getElementById('hours');
    if (hoursElement) {
      hoursElement.addEventListener('wheel', (event) => {
        this.Hours -= event.deltaY / 100;
        this.SetHoursString();
      });
    }
  }

  private SetHoursString() {
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

  public MinutesHandler() {
    const minutesElement = document.getElementById('minutes');
    if (minutesElement) {
      minutesElement.addEventListener('wheel', (event) => {
        this.Minutes -= event.deltaY / 100;
        this.SetMinutesString();
      });
    }
  }

  private SetMinutesString() {
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
}
