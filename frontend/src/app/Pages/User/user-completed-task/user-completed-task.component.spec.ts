import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompletedTaskComponent } from './user-completed-task.component';

describe('UserCompletedTaskComponent', () => {
  let component: UserCompletedTaskComponent;
  let fixture: ComponentFixture<UserCompletedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompletedTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCompletedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
