import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {LoggingService} from "./logging.service";
import * as StackTrace from 'stacktrace-js';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {
  }


  /**
   * Takes the error and current url puts it together and sends it to LoggerService. Rethrows the error.
   *
   * @param error
   */
  handleError(error: any): void {

    const message = error.message ? error.message : error.toString();

    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';

    // get the stack trace, lets grab the last 10 stacks only
    StackTrace.fromError(error).then(stackFrames => {
      const stackString = stackFrames
        .splice(0, 10)
        .map(function (sf) {
          return sf.toString();
        }).join('\n');

      const info = {message, url, stackString};

      // log on server or console
      LoggingService.log(info);

      throw error;
    });
  }
}
