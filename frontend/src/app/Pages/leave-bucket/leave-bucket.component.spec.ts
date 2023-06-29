import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBucketComponent } from './leave-bucket.component';

describe('LeaveBucketComponent', () => {
  let component: LeaveBucketComponent;
  let fixture: ComponentFixture<LeaveBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveBucketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
