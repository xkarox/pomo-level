import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css',
})
export class BackgroundComponent implements OnInit {
  ngOnInit(): void {
    const elements = document.getElementsByClassName('m-scroll');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.classList.add('animate');
    }
  }
}
