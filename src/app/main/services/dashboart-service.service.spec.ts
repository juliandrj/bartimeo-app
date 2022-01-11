import { TestBed } from '@angular/core/testing';

import { DashboartServiceService } from './dashboart-service.service';

describe('DashboartServiceService', () => {
  let service: DashboartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
