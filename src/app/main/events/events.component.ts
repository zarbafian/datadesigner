import { Component, OnInit } from '@angular/core';

import { EventLog } from '../../data/EventLog';

import { EventsService } from '../../service/events.service';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventLogs: EventLog[];

  constructor(
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    
    this.eventsService
      .getEventLogs()
      .subscribe(data => this.eventLogs = data);
  }

  sortData(event) {
    LOGGER.debug('EventsComponent.sortData: ' + event);
  }
}
