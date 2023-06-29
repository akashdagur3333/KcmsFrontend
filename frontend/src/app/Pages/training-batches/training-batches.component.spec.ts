import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingBatchesComponent } from './training-batches.component';

describe('TrainingBatchesComponent', () => {
  let component: TrainingBatchesComponent;
  let fixture: ComponentFixture<TrainingBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingBatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
