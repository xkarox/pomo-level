import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechbubbleComponent } from './speechbubble.component';

describe('SpeechbubbleComponent', () => {
  let component: SpeechbubbleComponent;
  let fixture: ComponentFixture<SpeechbubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeechbubbleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeechbubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
