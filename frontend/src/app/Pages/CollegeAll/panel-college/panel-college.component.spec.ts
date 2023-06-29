import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCollegeComponent } from './panel-college.component';

describe('PanelCollegeComponent', () => {
  let component: PanelCollegeComponent;
  let fixture: ComponentFixture<PanelCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelCollegeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
