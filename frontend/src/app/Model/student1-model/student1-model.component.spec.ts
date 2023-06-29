import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Student1ModelComponent } from './student1-model.component';

describe('Student1ModelComponent', () => {
  let component: Student1ModelComponent;
  let fixture: ComponentFixture<Student1ModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Student1ModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Student1ModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
