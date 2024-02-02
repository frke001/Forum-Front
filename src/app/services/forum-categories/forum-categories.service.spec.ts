import { TestBed } from '@angular/core/testing';

import { ForumCategoriesService } from './forum-categories.service';

describe('ForumCategoriesService', () => {
  let service: ForumCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
