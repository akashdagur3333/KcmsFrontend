import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadDepartmentComponent } from './head-department.component';

describe('HeadDepartmentComponent', () => {
  let component: HeadDepartmentComponent;
  let fixture: ComponentFixture<HeadDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
