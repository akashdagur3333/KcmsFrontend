import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamModelComponent } from './stream-model.component';

describe('StreamModelComponent', () => {
  let component: StreamModelComponent;
  let fixture: ComponentFixture<StreamModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
