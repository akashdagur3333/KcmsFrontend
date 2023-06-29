import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationModelComponent } from './designation-model.component';

describe('DesignationModelComponent', () => {
  let component: DesignationModelComponent;
  let fixture: ComponentFixture<DesignationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
