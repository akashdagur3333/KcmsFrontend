import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTestModelComponent } from './training-test-model.component';

describe('TrainingTestModelComponent', () => {
  let component: TrainingTestModelComponent;
  let fixture: ComponentFixture<TrainingTestModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingTestModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingTestModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
