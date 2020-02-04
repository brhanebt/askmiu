import { TestBed } from '@angular/core/testing';

import { FollowtopicService } from './followtopic.service';

describe('FollowtopicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FollowtopicService = TestBed.get(FollowtopicService);
    expect(service).toBeTruthy();
  });
});
