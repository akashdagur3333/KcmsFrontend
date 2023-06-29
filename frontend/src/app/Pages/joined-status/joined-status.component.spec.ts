import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedStatusComponent } from './joined-status.component';

describe('JoinedStatusComponent', () => {
  let component: JoinedStatusComponent;
  let fixture: ComponentFixture<JoinedStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinedStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
