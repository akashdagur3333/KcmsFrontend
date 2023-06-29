import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeftModelComponent } from './add-left-model.component';

describe('AddLeftModelComponent', () => {
  let component: AddLeftModelComponent;
  let fixture: ComponentFixture<AddLeftModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeftModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeftModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
