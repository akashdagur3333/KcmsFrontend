import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrActivityModelComponent } from './hr-activity-model.component';

describe('HrActivityModelComponent', () => {
  let component: HrActivityModelComponent;
  let fixture: ComponentFixture<HrActivityModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrActivityModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrActivityModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
