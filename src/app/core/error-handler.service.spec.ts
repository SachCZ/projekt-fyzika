import {inject, TestBed} from '@angular/core/testing';

import {GlobalErrorHandler} from './error-handler.service';

//TODO write unit tests for this
describe('ErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorHandler]
    });
  });

  it('should be created', inject([GlobalErrorHandler], (service: GlobalErrorHandler) => {
    expect(service).toBeTruthy();
  }));
});
