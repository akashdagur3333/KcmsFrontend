import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitedStatusComponent } from './awaited-status.component';

describe('AwaitedStatusComponent', () => {
  let component: AwaitedStatusComponent;
  let fixture: ComponentFixture<AwaitedStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwaitedStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwaitedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
