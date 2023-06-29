import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgersModelComponent } from './ledgers-model.component';

describe('LedgersModelComponent', () => {
  let component: LedgersModelComponent;
  let fixture: ComponentFixture<LedgersModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgersModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgersModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
