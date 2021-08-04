import { TestBed } from '@angular/core/testing';

import { MaladiesService } from './maladies.service';

describe('MaladiesService', () => {
  let service: MaladiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaladiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
