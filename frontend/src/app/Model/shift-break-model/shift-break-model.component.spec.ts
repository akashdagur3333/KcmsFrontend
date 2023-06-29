import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftBreakModelComponent } from './shift-break-model.component';

describe('ShiftBreakModelComponent', () => {
  let component: ShiftBreakModelComponent;
  let fixture: ComponentFixture<ShiftBreakModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftBreakModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftBreakModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
