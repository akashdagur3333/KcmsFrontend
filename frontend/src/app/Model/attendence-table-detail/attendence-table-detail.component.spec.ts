import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceTableDetailComponent } from './attendence-table-detail.component';

describe('AttendenceTableDetailComponent', () => {
  let component: AttendenceTableDetailComponent;
  let fixture: ComponentFixture<AttendenceTableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendenceTableDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendenceTableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
