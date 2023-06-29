import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAttendenceComponent } from './system-attendence.component';

describe('SystemAttendenceComponent', () => {
  let component: SystemAttendenceComponent;
  let fixture: ComponentFixture<SystemAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAttendenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
