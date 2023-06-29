import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelievingModelComponent } from './relieving-model.component';

describe('RelievingModelComponent', () => {
  let component: RelievingModelComponent;
  let fixture: ComponentFixture<RelievingModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelievingModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelievingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
