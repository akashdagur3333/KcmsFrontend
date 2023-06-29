import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdminFullComponent } from './main-admin-full.component';

describe('MainAdminFullComponent', () => {
  let component: MainAdminFullComponent;
  let fixture: ComponentFixture<MainAdminFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAdminFullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAdminFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
