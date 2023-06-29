import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialModelComponent } from './financial-model.component';

describe('FinancialModelComponent', () => {
  let component: FinancialModelComponent;
  let fixture: ComponentFixture<FinancialModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
