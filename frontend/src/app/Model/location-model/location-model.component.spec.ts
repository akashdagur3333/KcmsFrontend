import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationModelComponent } from './location-model.component';

describe('LocationModelComponent', () => {
  let component: LocationModelComponent;
  let fixture: ComponentFixture<LocationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
