import { TestBed } from '@angular/core/testing';

import { MesuresControleService } from './mesures-controle.service';

describe('MesuresControleService', () => {
  let service: MesuresControleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesuresControleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
