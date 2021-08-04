import { TestBed } from '@angular/core/testing';

import { TypeVaccinService } from './type-vaccin.service';

describe('TypeVaccinService', () => {
  let service: TypeVaccinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeVaccinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
