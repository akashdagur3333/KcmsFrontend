import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPerformanceComponent } from './emp-performance.component';

describe('EmpPerformanceComponent', () => {
  let component: EmpPerformanceComponent;
  let fixture: ComponentFixture<EmpPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
