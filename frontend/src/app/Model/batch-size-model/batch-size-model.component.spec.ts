import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSizeModelComponent } from './batch-size-model.component';

describe('BatchSizeModelComponent', () => {
  let component: BatchSizeModelComponent;
  let fixture: ComponentFixture<BatchSizeModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchSizeModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchSizeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
