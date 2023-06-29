import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineWaiverModelComponent } from './fine-waiver-model.component';

describe('FineWaiverModelComponent', () => {
  let component: FineWaiverModelComponent;
  let fixture: ComponentFixture<FineWaiverModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FineWaiverModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FineWaiverModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
