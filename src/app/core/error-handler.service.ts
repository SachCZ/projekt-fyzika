import {ErrorHandler, Injectable} from '@angular/core';
import * as Raven from "raven-js";
import {environment} from "../../environments/environment";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  /**
   * Takes the error and current url puts it together and sends it to LoggerService. Rethrows the error.
   *
   * @param error
   */
  handleError(error: any): void {

    Raven.captureException(error);
    if (!environment.production) throw error;
  }
}
