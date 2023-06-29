import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNormalComponent } from './add-normal.component';

describe('AddNormalComponent', () => {
  let component: AddNormalComponent;
  let fixture: ComponentFixture<AddNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNormalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
