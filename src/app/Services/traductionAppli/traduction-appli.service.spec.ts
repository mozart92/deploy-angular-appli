import { TestBed } from '@angular/core/testing';

import { TraductionAppliService } from './traduction-appli.service';

describe('TraductionAppliService', () => {
  let service: TraductionAppliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraductionAppliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
