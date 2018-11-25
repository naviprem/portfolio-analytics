import { TestBed, inject } from '@angular/core/testing';

import { D3HiLoChartsService } from './d3-hi-lo-charts.service';

describe('D3HiLoChartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [D3HiLoChartsService]
    });
  });

  it('should be created', inject([D3HiLoChartsService], (service: D3HiLoChartsService) => {
    expect(service).toBeTruthy();
  }));
});
