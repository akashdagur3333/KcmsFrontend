import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSizeComponent } from './batch-size.component';

describe('BatchSizeComponent', () => {
  let component: BatchSizeComponent;
  let fixture: ComponentFixture<BatchSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
