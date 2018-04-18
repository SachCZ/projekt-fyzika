import {Injectable} from '@angular/core';

@Injectable()
export class LoggingService {

  constructor() {
  }

  static log(info: any): void {
    //TODO implement this
    console.log(info);
  }

}
