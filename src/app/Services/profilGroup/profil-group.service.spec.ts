import { TestBed } from '@angular/core/testing';

import { ProfilGroupService } from './profil-group.service';

describe('ProfilGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfilGroupService = TestBed.get(ProfilGroupService);
    expect(service).toBeTruthy();
  });
});
