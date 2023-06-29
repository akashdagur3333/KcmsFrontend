import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaddepartmentModelComponent } from './headdepartment-model.component';

describe('HeaddepartmentModelComponent', () => {
  let component: HeaddepartmentModelComponent;
  let fixture: ComponentFixture<HeaddepartmentModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaddepartmentModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaddepartmentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
