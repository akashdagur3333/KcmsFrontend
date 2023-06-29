import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrMeetingComponent } from './hr-meeting.component';

describe('HrMeetingComponent', () => {
  let component: HrMeetingComponent;
  let fixture: ComponentFixture<HrMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrMeetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
