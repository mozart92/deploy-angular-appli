import { TestBed } from '@angular/core/testing';

import { EchangeDataService } from './echange-data.service';

describe('EchangeDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EchangeDataService = TestBed.get(EchangeDataService);
    expect(service).toBeTruthy();
  });
});
