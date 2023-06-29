import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdepartmentModelComponent } from './subdepartment-model.component';

describe('SubdepartmentModelComponent', () => {
  let component: SubdepartmentModelComponent;
  let fixture: ComponentFixture<SubdepartmentModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdepartmentModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdepartmentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
