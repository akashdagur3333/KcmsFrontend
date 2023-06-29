import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTestsComponent } from './training-tests.component';

describe('TrainingTestsComponent', () => {
  let component: TrainingTestsComponent;
  let fixture: ComponentFixture<TrainingTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingTestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
