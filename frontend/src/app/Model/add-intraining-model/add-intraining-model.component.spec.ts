import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntrainingModelComponent } from './add-intraining-model.component';

describe('AddIntrainingModelComponent', () => {
  let component: AddIntrainingModelComponent;
  let fixture: ComponentFixture<AddIntrainingModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIntrainingModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIntrainingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
