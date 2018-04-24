import { TestBed, inject } from '@angular/core/testing';

import { VibiiosService } from './vibiios.service';

describe('VibiiosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VibiiosService]
    });
  });

  it('should be created', inject([VibiiosService], (service: VibiiosService) => {
    expect(service).toBeTruthy();
  }));
});
