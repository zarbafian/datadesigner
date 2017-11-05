import { Component, OnInit, ViewChild } from '@angular/core';

import { Router /*, ActivatedRoute, ParamMap*/ } from '@angular/router';

import { MatTab /*, ActivatedRoute, ParamMap*/ } from '@angular/material';

import { LoginService } from '../../service/login.service';

import { DefinitionsComponent } from '../definitions/definitions.component';
import { EntitiesComponent } from '../entities/entities.component';
import { ReportsComponent } from '../reports/reports.component';
import { EventsComponent } from '../events/events.component';

import { Logger } from '../../util/Logger';
const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('definitionsTab')
  private definitionsTab: MatTab;

  @ViewChild('entitiesTab')
  private entitiesTab: MatTab;
  
  @ViewChild('reportsTab')
  private reportsTab: MatTab;
  
  @ViewChild('eventsTab')
  private eventsTab: MatTab;

  @ViewChild(DefinitionsComponent)
  private definitionsComponent: DefinitionsComponent;
  
  @ViewChild(EntitiesComponent)
  private entitiesComponent: EntitiesComponent;
  
  @ViewChild(ReportsComponent)
  private reportsComponent: ReportsComponent;
  
  @ViewChild(EventsComponent)
  private eventsComponent: EventsComponent;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  onTabChanged() {
    LOGGER.debug('HomeComponent.onTabChanged');
    if(this.definitionsTab.isActive) {
      LOGGER.debug('Re-init definitions components');
      this.definitionsComponent.init();
    }
    else if(this.entitiesTab.isActive) {
      LOGGER.debug('Re-init entities components');
      this.entitiesComponent.init();
    }
    else if(this.reportsTab.isActive) {
      LOGGER.debug('Re-init reports components');
      this.reportsComponent.init();
    }
    else if(this.eventsTab.isActive) {
      LOGGER.debug('Re-init events components');
      this.eventsComponent.init();
    }
  }
  ngOnInit() {
    LOGGER.debug('HomeComponent.ngOnInit');
  }

  principal() {
    LOGGER.debug('HomeComponent.principal');
    this.loginService.getPrincipal();
  }
  
  getApi() {
    LOGGER.debug('HomeComponent.getApi');
    this.loginService.isApiUp();
  }
  
  getAdminApi() {
    LOGGER.debug('HomeComponent.getAdminApi');
    this.loginService.isAdminApiUp();
  }
  
  logout() {
    LOGGER.debug('HomeComponent.logout');
    this.loginService
                .logout()
                .subscribe(
                  data => {
                    LOGGER.debug('HomeComponent - logout successful: ' + data);
                    this.router.navigate(['/signin']);
                  }
                );
  }
}
