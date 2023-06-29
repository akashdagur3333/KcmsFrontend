import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineModelComponent } from './fine-model.component';

describe('FineModelComponent', () => {
  let component: FineModelComponent;
  let fixture: ComponentFixture<FineModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FineModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FineModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
