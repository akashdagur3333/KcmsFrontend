import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsrValueModelComponent } from './vsr-value-model.component';

describe('VsrValueModelComponent', () => {
  let component: VsrValueModelComponent;
  let fixture: ComponentFixture<VsrValueModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VsrValueModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VsrValueModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
