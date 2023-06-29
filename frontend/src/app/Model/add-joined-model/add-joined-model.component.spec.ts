import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJoinedModelComponent } from './add-joined-model.component';

describe('AddJoinedModelComponent', () => {
  let component: AddJoinedModelComponent;
  let fixture: ComponentFixture<AddJoinedModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJoinedModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJoinedModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
