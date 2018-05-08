import { TestBed, inject } from '@angular/core/testing';

import { AnswerCallService } from './answer-call.service';

describe('AnswerCallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnswerCallService]
    });
  });

  it('should be created', inject([AnswerCallService], (service: AnswerCallService) => {
    expect(service).toBeTruthy();
  }));
});
