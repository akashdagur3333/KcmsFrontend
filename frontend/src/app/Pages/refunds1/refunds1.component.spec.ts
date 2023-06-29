import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Refunds1Component } from './refunds1.component';

describe('Refunds1Component', () => {
  let component: Refunds1Component;
  let fixture: ComponentFixture<Refunds1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Refunds1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Refunds1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
