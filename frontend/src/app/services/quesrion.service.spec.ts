import { TestBed } from '@angular/core/testing';

import { QuesrionService } from './quesrion.service';

describe('QuesrionService', () => {
  let service: QuesrionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuesrionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
