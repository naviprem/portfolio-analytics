import { TestBed, inject } from '@angular/core/testing';

import { IextradingService } from './iextrading.service';

describe('IextradingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IextradingService]
    });
  });

  it('should be created', inject([IextradingService], (service: IextradingService) => {
    expect(service).toBeTruthy();
  }));
});
