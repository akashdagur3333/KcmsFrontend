import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationModelComponent } from './qualification-model.component';

describe('QualificationModelComponent', () => {
  let component: QualificationModelComponent;
  let fixture: ComponentFixture<QualificationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualificationModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
