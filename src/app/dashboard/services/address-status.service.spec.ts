import { TestBed, inject } from '@angular/core/testing';

import { AddressStatusService } from './address-status.service';

describe('AddressStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressStatusService]
    });
  });

  it('should be created', inject([AddressStatusService], (service: AddressStatusService) => {
    expect(service).toBeTruthy();
  }));
});
