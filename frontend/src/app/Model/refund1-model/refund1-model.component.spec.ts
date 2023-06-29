import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Refund1ModelComponent } from './refund1-model.component';

describe('Refund1ModelComponent', () => {
  let component: Refund1ModelComponent;
  let fixture: ComponentFixture<Refund1ModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Refund1ModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Refund1ModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
