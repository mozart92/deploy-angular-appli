import { TestBed } from '@angular/core/testing';

import { ElementMenuService } from './element-menu.service';

describe('ElementMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElementMenuService = TestBed.get(ElementMenuService);
    expect(service).toBeTruthy();
  });
});
