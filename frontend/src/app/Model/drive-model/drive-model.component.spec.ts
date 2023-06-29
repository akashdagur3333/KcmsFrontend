import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveModelComponent } from './drive-model.component';

describe('DriveModelComponent', () => {
  let component: DriveModelComponent;
  let fixture: ComponentFixture<DriveModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
