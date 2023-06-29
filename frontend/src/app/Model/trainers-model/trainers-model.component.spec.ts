import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersModelComponent } from './trainers-model.component';

describe('TrainersModelComponent', () => {
  let component: TrainersModelComponent;
  let fixture: ComponentFixture<TrainersModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainersModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainersModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
