import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineWaiverComponent } from './fine-waiver.component';

describe('FineWaiverComponent', () => {
  let component: FineWaiverComponent;
  let fixture: ComponentFixture<FineWaiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FineWaiverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FineWaiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
