import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VSRWaiverComponent } from './vsrwaiver.component';

describe('VSRWaiverComponent', () => {
  let component: VSRWaiverComponent;
  let fixture: ComponentFixture<VSRWaiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VSRWaiverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VSRWaiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
