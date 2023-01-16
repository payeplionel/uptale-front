import { TestBed } from '@angular/core/testing';

import { FormQuizService } from './form-quiz.service';

describe('FormQuizService', () => {
  let service: FormQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
