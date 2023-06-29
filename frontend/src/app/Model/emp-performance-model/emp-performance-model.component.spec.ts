import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPerformanceModelComponent } from './emp-performance-model.component';

describe('EmpPerformanceModelComponent', () => {
  let component: EmpPerformanceModelComponent;
  let fixture: ComponentFixture<EmpPerformanceModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpPerformanceModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpPerformanceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
