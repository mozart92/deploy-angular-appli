import { TestBed } from '@angular/core/testing';

import { ThemesUsersService } from './themes-users.service';

describe('ThemesUsersService', () => {
  let service: ThemesUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemesUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
