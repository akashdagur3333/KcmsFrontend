import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttandanceDataModelComponent } from './attandance-data-model.component';

describe('AttandanceDataModelComponent', () => {
  let component: AttandanceDataModelComponent;
  let fixture: ComponentFixture<AttandanceDataModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttandanceDataModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttandanceDataModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
