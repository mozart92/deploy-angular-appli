import { TestBed } from '@angular/core/testing';

import { CzvsService } from './czvs.service';

describe('CzvsService', () => {
  let service: CzvsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CzvsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
