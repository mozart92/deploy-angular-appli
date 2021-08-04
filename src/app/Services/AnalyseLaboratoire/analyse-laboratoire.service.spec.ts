import { TestBed } from '@angular/core/testing';

import { AnalyseLaboratoireService } from './analyse-laboratoire.service';

describe('AnalyseLaboratoireService', () => {
  let service: AnalyseLaboratoireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyseLaboratoireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
