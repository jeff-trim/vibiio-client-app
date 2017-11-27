import { TestBed, inject } from '@angular/core/testing';

import { VibiioProfileFormStatusService } from './vibiio-profile-form-status.service';

describe('VibiioProfileFormStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VibiioProfileFormStatusService]
    });
  });

  it('should be created', inject([VibiioProfileFormStatusService], (service: VibiioProfileFormStatusService) => {
    expect(service).toBeTruthy();
  }));
});
