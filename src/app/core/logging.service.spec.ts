import {inject, TestBed} from '@angular/core/testing';

import {LoggingService} from './logging.service';

//TODO Write unit tests for this
describe('LoggingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggingService]
    });
  });

  it('should be created', inject([LoggingService], (service: LoggingService) => {
    expect(service).toBeTruthy();
  }));
});
