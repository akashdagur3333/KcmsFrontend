import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpServiceRecordModelComponent } from './emp-service-record-model.component';

describe('EmpServiceRecordModelComponent', () => {
  let component: EmpServiceRecordModelComponent;
  let fixture: ComponentFixture<EmpServiceRecordModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpServiceRecordModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpServiceRecordModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
