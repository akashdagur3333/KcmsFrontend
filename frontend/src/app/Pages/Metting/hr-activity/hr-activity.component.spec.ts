import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrActivityComponent } from './hr-activity.component';

describe('HrActivityComponent', () => {
  let component: HrActivityComponent;
  let fixture: ComponentFixture<HrActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
