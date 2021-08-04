import { TestBed } from '@angular/core/testing';

import { NaturePrelevementService } from './nature-prelevement.service';

describe('NaturePrelevementService', () => {
  let service: NaturePrelevementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaturePrelevementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
