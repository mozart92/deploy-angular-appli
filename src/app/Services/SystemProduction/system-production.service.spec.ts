import { TestBed } from '@angular/core/testing';

import { SystemProductionService } from './system-production.service';

describe('SystemProductionService', () => {
  let service: SystemProductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemProductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
