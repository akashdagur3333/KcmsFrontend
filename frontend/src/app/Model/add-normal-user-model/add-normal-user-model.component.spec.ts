import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNormalUserModelComponent } from './add-normal-user-model.component';

describe('AddNormalUserModelComponent', () => {
  let component: AddNormalUserModelComponent;
  let fixture: ComponentFixture<AddNormalUserModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNormalUserModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNormalUserModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
