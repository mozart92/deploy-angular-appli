import { TestBed } from '@angular/core/testing';

import { AnwserQuestionsService } from './anwser-questions.service';

describe('AnwserQuestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnwserQuestionsService = TestBed.get(AnwserQuestionsService);
    expect(service).toBeTruthy();
  });
});
