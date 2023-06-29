import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTaskComponent } from './total-task.component';

describe('TotalTaskComponent', () => {
  let component: TotalTaskComponent;
  let fixture: ComponentFixture<TotalTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
