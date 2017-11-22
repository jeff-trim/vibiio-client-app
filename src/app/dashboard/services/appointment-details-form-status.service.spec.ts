import { TestBed, inject } from '@angular/core/testing';

import { AppointmentDetailsFormStatusService } from './appointment-details-form-status.service';

describe('AppointmentDetailsFormStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppointmentDetailsFormStatusService]
    });
  });

  it('should be created', inject([AppointmentDetailsFormStatusService], (service: AppointmentDetailsFormStatusService) => {
    expect(service).toBeTruthy();
  }));
});
