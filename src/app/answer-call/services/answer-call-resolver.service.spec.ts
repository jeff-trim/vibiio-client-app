import { TestBed, inject } from '@angular/core/testing';

import { AnswerCallResolverService } from './answer-call-resolver.service';

describe('AnswerCallResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnswerCallResolverService]
    });
  });

  it('should be created', inject([AnswerCallResolverService], (service: AnswerCallResolverService) => {
    expect(service).toBeTruthy();
  }));
});
