import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelievingComponent } from './relieving.component';

describe('RelievingComponent', () => {
  let component: RelievingComponent;
  let fixture: ComponentFixture<RelievingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelievingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelievingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
