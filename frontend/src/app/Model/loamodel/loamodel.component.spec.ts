import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LOAModelComponent } from './loamodel.component';

describe('LOAModelComponent', () => {
  let component: LOAModelComponent;
  let fixture: ComponentFixture<LOAModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LOAModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LOAModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
