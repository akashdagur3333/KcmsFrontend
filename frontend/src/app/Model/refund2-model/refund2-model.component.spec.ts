import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Refund2ModelComponent } from './refund2-model.component';

describe('Refund2ModelComponent', () => {
  let component: Refund2ModelComponent;
  let fixture: ComponentFixture<Refund2ModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Refund2ModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Refund2ModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
