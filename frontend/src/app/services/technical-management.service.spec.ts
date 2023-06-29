import { TestBed } from '@angular/core/testing';

import { TechnicalManagementService } from './technical-management.service';

describe('TechnicalManagementService', () => {
  let service: TechnicalManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
