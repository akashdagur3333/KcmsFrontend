import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingcompletedComponent } from './trainingcompleted.component';

describe('TrainingcompletedComponent', () => {
  let component: TrainingcompletedComponent;
  let fixture: ComponentFixture<TrainingcompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingcompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingcompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
