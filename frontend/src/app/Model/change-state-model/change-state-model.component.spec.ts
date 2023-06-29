import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStateModelComponent } from './change-state-model.component';

describe('ChangeStateModelComponent', () => {
  let component: ChangeStateModelComponent;
  let fixture: ComponentFixture<ChangeStateModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeStateModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeStateModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
