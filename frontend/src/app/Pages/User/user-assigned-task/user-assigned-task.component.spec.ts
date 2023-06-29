import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignedTaskComponent } from './user-assigned-task.component';

describe('UserAssignedTaskComponent', () => {
  let component: UserAssignedTaskComponent;
  let fixture: ComponentFixture<UserAssignedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAssignedTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAssignedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
