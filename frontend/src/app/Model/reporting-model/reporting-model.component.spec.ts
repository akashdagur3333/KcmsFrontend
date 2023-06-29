import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingModelComponent } from './reporting-model.component';

describe('ReportingModelComponent', () => {
  let component: ReportingModelComponent;
  let fixture: ComponentFixture<ReportingModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportingModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
