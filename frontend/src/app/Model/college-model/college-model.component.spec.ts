import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeModelComponent } from './college-model.component';

describe('CollegeModelComponent', () => {
  let component: CollegeModelComponent;
  let fixture: ComponentFixture<CollegeModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollegeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
