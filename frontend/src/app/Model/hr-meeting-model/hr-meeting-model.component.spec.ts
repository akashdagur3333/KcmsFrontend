import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrMeetingModelComponent } from './hr-meeting-model.component';

describe('HrMeetingModelComponent', () => {
  let component: HrMeetingModelComponent;
  let fixture: ComponentFixture<HrMeetingModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrMeetingModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrMeetingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
