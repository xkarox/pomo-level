import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  public ThrottleFunction(fn: Function, delay: number) {
    var time = Date.now();

    return function (event: WheelEvent) {
      // we dismiss every wheel event with deltaY less than 4
      if (Math.abs(event.deltaY) < 4) return;

      if (time + delay - Date.now() < 0) {
        fn(event);
        time = Date.now();
      }
    };
  }
}
