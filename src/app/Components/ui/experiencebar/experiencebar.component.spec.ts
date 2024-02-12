import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencebarComponent } from './experiencebar.component';

describe('ExperiencebarComponent', () => {
  let component: ExperiencebarComponent;
  let fixture: ComponentFixture<ExperiencebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperiencebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
