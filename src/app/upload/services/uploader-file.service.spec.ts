import { TestBed } from '@angular/core/testing';

import { UploaderFileService } from './uploader-file.service';

describe('UploaderFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploaderFileService = TestBed.get(UploaderFileService);
    expect(service).toBeTruthy();
  });
});
