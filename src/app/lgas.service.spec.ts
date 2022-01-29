import { TestBed } from '@angular/core/testing';

import { LgasService } from './lgas.service';

describe('LgasService', () => {
  let service: LgasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LgasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
