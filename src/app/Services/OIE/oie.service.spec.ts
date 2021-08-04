import { TestBed } from '@angular/core/testing';

import { OIEService } from './oie.service';

describe('OIEService', () => {
  let service: OIEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OIEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
