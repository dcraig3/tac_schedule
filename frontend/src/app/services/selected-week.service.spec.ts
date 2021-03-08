import { TestBed } from '@angular/core/testing';

import { SelectedWeekService } from './selected-week.service';

describe('SelectedWeekService', () => {
  let service: SelectedWeekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedWeekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
