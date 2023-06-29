import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftStatusComponent } from './left-status.component';

describe('LeftStatusComponent', () => {
  let component: LeftStatusComponent;
  let fixture: ComponentFixture<LeftStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
