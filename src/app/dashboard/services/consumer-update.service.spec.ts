import { TestBed, inject } from '@angular/core/testing';

import { ConsumerUpdateService } from './consumer-update.service';

describe('ConsumerUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsumerUpdateService]
    });
  });

  it('should be created', inject([ConsumerUpdateService], (service: ConsumerUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
