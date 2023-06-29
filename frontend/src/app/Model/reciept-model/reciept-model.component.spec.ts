import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieptModelComponent } from './reciept-model.component';

describe('RecieptModelComponent', () => {
  let component: RecieptModelComponent;
  let fixture: ComponentFixture<RecieptModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecieptModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecieptModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
