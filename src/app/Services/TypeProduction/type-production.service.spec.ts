import { TestBed } from '@angular/core/testing';

import { TypeProductionService } from './type-production.service';

describe('TypeProductionService', () => {
  let service: TypeProductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeProductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
