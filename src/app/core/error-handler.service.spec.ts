import {inject, TestBed} from '@angular/core/testing';

import {GlobalErrorHandler} from './error-handler.service';
import {APP_BASE_HREF, LocationStrategy} from "@angular/common";
import * as Raven from "raven-js";

const testKitInitializer = require('raven-testkit');


//TODO write unit tests for this
describe('ErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorHandler, {provide: APP_BASE_HREF, useValue: '/'}, LocationStrategy],
    });
  });

  it('should be created', inject([GlobalErrorHandler], (service: GlobalErrorHandler) => {
    expect(service).toBeTruthy();
  }));

  it('should handle thrown error and rethrow and call Raven', inject([GlobalErrorHandler], (service: GlobalErrorHandler) => {
    const testKit = testKitInitializer(Raven);

    expect(() => {
      service.handleError(new Error('mock error'))
    }).toThrowError('mock error');

    expect(testKit.reports().length).toBe(1);
    const report = testKit.reports()[0];
    expect(report.platform).toBeDefined();
  }));
});
