import { TestBed } from '@angular/core/testing';

import { NewPlannificationService } from './new-plannification.service';

describe('NewPlannificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewPlannificationService = TestBed.get(NewPlannificationService);
    expect(service).toBeTruthy();
  });
});
