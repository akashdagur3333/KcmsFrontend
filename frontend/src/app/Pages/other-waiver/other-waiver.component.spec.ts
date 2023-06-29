import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherWaiverComponent } from './other-waiver.component';

describe('OtherWaiverComponent', () => {
  let component: OtherWaiverComponent;
  let fixture: ComponentFixture<OtherWaiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherWaiverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherWaiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
