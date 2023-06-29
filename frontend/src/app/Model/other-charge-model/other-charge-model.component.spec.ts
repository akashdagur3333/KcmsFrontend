import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherChargeModelComponent } from './other-charge-model.component';

describe('OtherChargeModelComponent', () => {
  let component: OtherChargeModelComponent;
  let fixture: ComponentFixture<OtherChargeModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherChargeModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherChargeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
