import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesetComponent } from './timeset.component';

describe('TimesetComponent', () => {
  let component: TimesetComponent;
  let fixture: ComponentFixture<TimesetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
