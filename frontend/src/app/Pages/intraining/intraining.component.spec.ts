import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrainingComponent } from './intraining.component';

describe('IntrainingComponent', () => {
  let component: IntrainingComponent;
  let fixture: ComponentFixture<IntrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
