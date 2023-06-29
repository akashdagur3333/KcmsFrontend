import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherWaiverModelComponent } from './other-waiver-model.component';

describe('OtherWaiverModelComponent', () => {
  let component: OtherWaiverModelComponent;
  let fixture: ComponentFixture<OtherWaiverModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherWaiverModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherWaiverModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
