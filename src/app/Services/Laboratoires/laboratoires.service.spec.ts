import { TestBed } from '@angular/core/testing';

import { LaboratoiresService } from './laboratoires.service';

describe('LaboratoiresService', () => {
  let service: LaboratoiresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboratoiresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
