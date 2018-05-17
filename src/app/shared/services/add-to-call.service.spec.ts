import { TestBed, inject } from '@angular/core/testing';

import { AddToCallService } from './add-to-call.service';

describe('AddToCallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddToCallService]
    });
  });

  it('should be created', inject([AddToCallService], (service: AddToCallService) => {
    expect(service).toBeTruthy();
  }));
});
