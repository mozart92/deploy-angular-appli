import { TestBed } from '@angular/core/testing';

import { NotificationsGeneralService } from './notifications-general.service';

describe('NotificationsGeneralService', () => {
  let service: NotificationsGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
