import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignTaskModelComponent } from './add-assign-task-model.component';

describe('AddAssignTaskModelComponent', () => {
  let component: AddAssignTaskModelComponent;
  let fixture: ComponentFixture<AddAssignTaskModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssignTaskModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssignTaskModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
