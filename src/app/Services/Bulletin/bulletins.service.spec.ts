import { TestBed } from '@angular/core/testing';

import { BulletinsService } from './bulletins.service';

describe('BulletinsService', () => {
  let service: BulletinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulletinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
