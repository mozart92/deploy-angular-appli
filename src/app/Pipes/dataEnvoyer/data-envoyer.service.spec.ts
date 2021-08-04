import { TestBed } from '@angular/core/testing';

import { DataEnvoyerService } from './data-envoyer.service';

describe('DataEnvoyerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataEnvoyerService = TestBed.get(DataEnvoyerService);
    expect(service).toBeTruthy();
  });
});
