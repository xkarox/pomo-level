import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-speechbubble',
  standalone: true,
  imports: [],
  templateUrl: './speechbubble.component.html',
  styleUrl: './speechbubble.component.css'
})
export class SpeechbubbleComponent implements OnInit{
  ngOnInit() {
    this.StartQuoteCycle();
  }

  private StartQuoteCycle() {
    setTimeout(() => this.Start(), 1000 * 20)
  }

  private async Start() {
    const random = Math.random();
    // TODO: Change to 0.11
    if (random < 1) {
      await this.DisplayQuote()
    }

    this.StartQuoteCycle();
  }

  private async DisplayQuote() {
    const response = await fetch("https://api.quotable.io/quotes/random")

    const quote = await response.json();
    const splitQuote = quote[0].content.split(" ");
    let quoteString = "";

    for (let i = 0; i < splitQuote.length; i++) {
      if (i % 5 === 0) {
        quoteString += "<p style='-webkit-text-stroke-width: 0;'>" + splitQuote[i] + " ";
      } else {
        quoteString += splitQuote[i] + " ";
      }
    }
    let element = document.getElementsByClassName("speechbubble")[0];
    element.innerHTML = quoteString;
    element.classList.add("cbbl", "-right");

    setTimeout(() => {
      element.innerHTML = "";
      element.classList.remove("cbbl", "-right");
    }, 1000 * 10);
  }


}
//
