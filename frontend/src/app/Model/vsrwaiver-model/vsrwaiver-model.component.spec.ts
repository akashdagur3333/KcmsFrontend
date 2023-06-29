import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VSRWaiverModelComponent } from './vsrwaiver-model.component';

describe('VSRWaiverModelComponent', () => {
  let component: VSRWaiverModelComponent;
  let fixture: ComponentFixture<VSRWaiverModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VSRWaiverModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VSRWaiverModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
