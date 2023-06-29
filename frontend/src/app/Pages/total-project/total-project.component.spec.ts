import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProjectComponent } from './total-project.component';

describe('TotalProjectComponent', () => {
  let component: TotalProjectComponent;
  let fixture: ComponentFixture<TotalProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
