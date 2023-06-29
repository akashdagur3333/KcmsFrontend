import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsrValueComponent } from './vsr-value.component';

describe('VsrValueComponent', () => {
  let component: VsrValueComponent;
  let fixture: ComponentFixture<VsrValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VsrValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VsrValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
