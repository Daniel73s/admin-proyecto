import { TestBed } from '@angular/core/testing';

import { ColegiosService } from './colegios.service';

describe('ColegiosService', () => {
  let service: ColegiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColegiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
