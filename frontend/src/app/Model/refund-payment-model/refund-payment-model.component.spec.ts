import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPaymentModelComponent } from './refund-payment-model.component';

describe('RefundPaymentModelComponent', () => {
  let component: RefundPaymentModelComponent;
  let fixture: ComponentFixture<RefundPaymentModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundPaymentModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefundPaymentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
