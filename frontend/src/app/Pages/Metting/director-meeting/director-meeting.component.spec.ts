import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorMeetingComponent } from './director-meeting.component';

describe('DirectorMeetingComponent', () => {
  let component: DirectorMeetingComponent;
  let fixture: ComponentFixture<DirectorMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorMeetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
