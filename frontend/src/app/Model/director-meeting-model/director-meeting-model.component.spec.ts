import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorMeetingModelComponent } from './director-meeting-model.component';

describe('DirectorMeetingModelComponent', () => {
  let component: DirectorMeetingModelComponent;
  let fixture: ComponentFixture<DirectorMeetingModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorMeetingModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorMeetingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
