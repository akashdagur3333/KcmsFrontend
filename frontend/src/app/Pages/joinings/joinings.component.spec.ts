import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningsComponent } from './joinings.component';

describe('JoiningsComponent', () => {
  let component: JoiningsComponent;
  let fixture: ComponentFixture<JoiningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoiningsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoiningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
