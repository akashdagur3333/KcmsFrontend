import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InPoolComponent } from './in-pool.component';

describe('InPoolComponent', () => {
  let component: InPoolComponent;
  let fixture: ComponentFixture<InPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InPoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
