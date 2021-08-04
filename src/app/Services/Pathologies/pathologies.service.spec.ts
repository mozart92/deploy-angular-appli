import { TestBed } from '@angular/core/testing';

import { PathologiesService } from './pathologies.service';

describe('PathologiesService', () => {
  let service: PathologiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathologiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
