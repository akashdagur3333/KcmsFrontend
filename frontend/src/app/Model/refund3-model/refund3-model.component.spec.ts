import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Refund3ModelComponent } from './refund3-model.component';

describe('Refund3ModelComponent', () => {
  let component: Refund3ModelComponent;
  let fixture: ComponentFixture<Refund3ModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Refund3ModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Refund3ModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
