import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRecordsAttendenceModelComponent } from './all-records-attendence-model.component';

describe('AllRecordsAttendenceModelComponent', () => {
  let component: AllRecordsAttendenceModelComponent;
  let fixture: ComponentFixture<AllRecordsAttendenceModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRecordsAttendenceModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRecordsAttendenceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
