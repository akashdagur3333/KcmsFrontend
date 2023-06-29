import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionModelComponent } from './question-model.component';

describe('QuestionModelComponent', () => {
  let component: QuestionModelComponent;
  let fixture: ComponentFixture<QuestionModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
