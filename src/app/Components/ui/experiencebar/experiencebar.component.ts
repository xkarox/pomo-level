import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {LevelService} from "../../../Services/level.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-experiencebar',
  standalone: true,
  imports: [],
  templateUrl: './experiencebar.component.html',
  styleUrl: './experiencebar.component.css'
})
export class ExperiencebarComponent implements OnInit, AfterViewInit{
  public level: number = 0;
  public experience: number = 0;
  public expNeeded: number = 0;

  private UpdateExperienceBarEventSub!: Subscription;
  @Input()
  UpdateExperienceBarEvent!: Observable<void>;

  constructor(private levelService: LevelService) {
    this.UpdateExperienceBar();
  }

  ngOnInit() {
    this.UpdateExperienceBarEventSub = this.UpdateExperienceBarEvent.subscribe(() => {
      this.UpdateExperienceBar();
    });
  }

  ngAfterViewInit() {
    this.ChangeExperienceBarWidth()
  }

  private UpdateExperienceBar() {
    this.level = parseInt(this.levelService.GetLevel());
    this.experience = parseInt(this.levelService.GetCurrentExperience());
    this.expNeeded = this.levelService.GetExperienceNeeded(this.level);

    this.ChangeExperienceBarWidth()
  }

  private ChangeExperienceBarWidth(){
    let innerExpBarElement: Element | null;
    innerExpBarElement = document.querySelector(".bar");

    if(innerExpBarElement != null){
      // @ts-ignore
      innerExpBarElement.style.width = String(this.experience / this.expNeeded * 100) + "%";
    }
  }
}
