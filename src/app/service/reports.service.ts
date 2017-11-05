import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { ReportData } from '../data/ReportData';
import { ReportResults } from '../data/ReportResults';

import { Constants } from '../util/Constants';
import { Logger } from '../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Injectable()
export class ReportsService {

  constructor(private http: Http) { }

  getMainReports(): Observable<ReportData[]> {

    LOGGER.debug('ReportsService.getMainReports');

    return this.http
      .get(
      Constants.getMainReports()
      )
      .map(
      resp => resp.json()
      );
  }

  getEntityReport(name: string): Observable<ReportResults> {

    LOGGER.debug('ReportsService.getEntityReport: ' + name);

    return this.http
      .get(
      Constants.getEntityReport(name)
      )
      .map(
      resp => resp.json()
      );
  }

}
