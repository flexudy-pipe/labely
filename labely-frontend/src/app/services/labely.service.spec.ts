import { TestBed } from '@angular/core/testing';

import { LabelyService } from './labely.service';

describe('LabelyService', () => {
  let service: LabelyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
