import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionModelComponent } from './add-question-model.component';

describe('AddQuestionModelComponent', () => {
  let component: AddQuestionModelComponent;
  let fixture: ComponentFixture<AddQuestionModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
