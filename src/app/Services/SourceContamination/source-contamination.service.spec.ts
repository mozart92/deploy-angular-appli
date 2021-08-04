import { TestBed } from '@angular/core/testing';

import { SourceContaminationService } from './source-contamination.service';

describe('SourceContaminationService', () => {
  let service: SourceContaminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceContaminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
