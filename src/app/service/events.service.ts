import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { EventLog } from '../data/EventLog';

import { Constants } from '../util/Constants';
import { Logger } from '../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Injectable()
export class EventsService {

  constructor(private http: Http) { }

  getEventLogs(): Observable<EventLog[]> {

    LOGGER.debug('EventsService.getEventLogs');

    return this.http
      .get(
      Constants.getEventLogs()
      )
      .map(
      resp => resp.json()
      );
  }
}
