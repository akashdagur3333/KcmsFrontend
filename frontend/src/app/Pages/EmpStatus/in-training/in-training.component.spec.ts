import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InTrainingComponent } from './in-training.component';

describe('InTrainingComponent', () => {
  let component: InTrainingComponent;
  let fixture: ComponentFixture<InTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
