import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAssignmentModelComponent } from './total-assignment-model.component';

describe('TotalAssignmentModelComponent', () => {
  let component: TotalAssignmentModelComponent;
  let fixture: ComponentFixture<TotalAssignmentModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalAssignmentModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalAssignmentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
