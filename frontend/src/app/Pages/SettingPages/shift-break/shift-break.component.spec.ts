import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftBreakComponent } from './shift-break.component';

describe('ShiftBreakComponent', () => {
  let component: ShiftBreakComponent;
  let fixture: ComponentFixture<ShiftBreakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftBreakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
