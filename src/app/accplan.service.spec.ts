import { TestBed } from '@angular/core/testing';

import { AccplanService } from './accplan.service';

describe('AccplanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccplanService = TestBed.get(AccplanService);
    expect(service).toBeTruthy();
  });
});
