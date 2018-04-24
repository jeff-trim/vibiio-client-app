import { TestBed, inject } from '@angular/core/testing';

import { VibiiographerCallResolverService } from './vibiiographer-call-resolver.service';

describe('VibiiographerCallResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VibiiographerCallResolverService]
    });
  });

  it('should be created', inject([VibiiographerCallResolverService], (service: VibiiographerCallResolverService) => {
    expect(service).toBeTruthy();
  }));
});
