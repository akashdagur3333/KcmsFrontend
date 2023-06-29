import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingCompleteModelComponent } from './add-training-complete-model.component';

describe('AddTrainingCompleteModelComponent', () => {
  let component: AddTrainingCompleteModelComponent;
  let fixture: ComponentFixture<AddTrainingCompleteModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrainingCompleteModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrainingCompleteModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
