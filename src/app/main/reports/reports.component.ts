import { Component, OnInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ReportData } from '../../data/ReportData';
import { ReportResults } from '../../data/ReportResults';

import { ReportsService } from '../../service/reports.service';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports: ReportData[];

  selectedReport: ReportData;

  reportResults: ReportResults;

  showResults: boolean = false;

  displayedColumns = [];
  dataSource;

  constructor(
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    this.init();
  }
  
  init() {
    
    LOGGER.debug('ReportsComponent.init');
    
    this.reportsService
      .getMainReports()
      .subscribe(
      data => {
        this.reports = data;
      });
  }

  selectReport(report: ReportData) {

    LOGGER.debug('ReportsComponent.selectReport: ' + report.name);

    this.showResults = false;

    this.selectedReport = report;

    this.reportsService
      .getEntityReport(this.selectedReport.name)
      .subscribe(
      data => {
        this.reportResults = new ReportResults(data.name, data.columns, data.rows);

        this.displayedColumns = this.reportResults.getColumnsNames();
        this.dataSource = this.reportResults;

        this.showResults = true;
      });
  }
}
