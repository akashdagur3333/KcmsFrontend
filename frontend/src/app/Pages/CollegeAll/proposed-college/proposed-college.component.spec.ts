import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedCollegeComponent } from './proposed-college.component';

describe('ProposedCollegeComponent', () => {
  let component: ProposedCollegeComponent;
  let fixture: ComponentFixture<ProposedCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposedCollegeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposedCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
