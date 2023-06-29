import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageModelComponent } from './package-model.component';

describe('PackageModelComponent', () => {
  let component: PackageModelComponent;
  let fixture: ComponentFixture<PackageModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
