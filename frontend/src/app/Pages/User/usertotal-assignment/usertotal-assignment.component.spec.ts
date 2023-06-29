import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertotalAssignmentComponent } from './usertotal-assignment.component';

describe('UsertotalAssignmentComponent', () => {
  let component: UsertotalAssignmentComponent;
  let fixture: ComponentFixture<UsertotalAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsertotalAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsertotalAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
