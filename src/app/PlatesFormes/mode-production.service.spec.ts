import { TestBed } from '@angular/core/testing';

import { ModeProductionService } from './mode-production.service';

describe('ModeProductionService', () => {
  let service: ModeProductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeProductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
