import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUserFullComponent } from './main-user-full.component';

describe('MainUserFullComponent', () => {
  let component: MainUserFullComponent;
  let fixture: ComponentFixture<MainUserFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainUserFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainUserFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
