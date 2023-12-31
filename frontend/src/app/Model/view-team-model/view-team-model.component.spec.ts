import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeamModelComponent } from './view-team-model.component';

describe('ViewTeamModelComponent', () => {
  let component: ViewTeamModelComponent;
  let fixture: ComponentFixture<ViewTeamModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTeamModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTeamModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
