import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammemberModelComponent } from './teammember-model.component';

describe('TeammemberModelComponent', () => {
  let component: TeammemberModelComponent;
  let fixture: ComponentFixture<TeammemberModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeammemberModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeammemberModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
