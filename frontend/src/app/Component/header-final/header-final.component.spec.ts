import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFinalComponent } from './header-final.component';

describe('HeaderFinalComponent', () => {
  let component: HeaderFinalComponent;
  let fixture: ComponentFixture<HeaderFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderFinalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
