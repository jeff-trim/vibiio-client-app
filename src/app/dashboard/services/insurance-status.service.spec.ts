import { TestBed, inject } from '@angular/core/testing';

import { InsuranceStatusService } from './insurance-status.service';

describe('InsuranceStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsuranceStatusService]
    });
  });

  it('should be created', inject([InsuranceStatusService], (service: InsuranceStatusService) => {
    expect(service).toBeTruthy();
  }));
});
