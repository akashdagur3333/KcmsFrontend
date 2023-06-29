import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpServiceRecordComponent } from './emp-service-record.component';

describe('EmpServiceRecordComponent', () => {
  let component: EmpServiceRecordComponent;
  let fixture: ComponentFixture<EmpServiceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpServiceRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpServiceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
