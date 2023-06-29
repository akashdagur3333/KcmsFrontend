import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCompletedComponent } from './training-completed.component';

describe('TrainingCompletedComponent', () => {
  let component: TrainingCompletedComponent;
  let fixture: ComponentFixture<TrainingCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
