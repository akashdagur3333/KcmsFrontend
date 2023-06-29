import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAssignmentComponent } from './total-assignment.component';

describe('TotalAssignmentComponent', () => {
  let component: TotalAssignmentComponent;
  let fixture: ComponentFixture<TotalAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
