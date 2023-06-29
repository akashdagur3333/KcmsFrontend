import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFailedTaskComponent } from './user-failed-task.component';

describe('UserFailedTaskComponent', () => {
  let component: UserFailedTaskComponent;
  let fixture: ComponentFixture<UserFailedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFailedTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFailedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
