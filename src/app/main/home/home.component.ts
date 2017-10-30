import { Component, OnInit, ViewChild } from '@angular/core';

import { Router /*, ActivatedRoute, ParamMap*/ } from '@angular/router';

import { MatTab /*, ActivatedRoute, ParamMap*/ } from '@angular/material';

import { LoginService } from '../../service/login.service';

import { EntitiesComponent } from '../entities/entities.component';

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

  @ViewChild(EntitiesComponent)
  private entitiesComponent: EntitiesComponent;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  onTabChanged() {
    LOGGER.debug('HomeComponent.onTabChanged');
    if(this.entitiesTab.isActive) {
      LOGGER.debug('Re-init entities components');
      this.entitiesComponent.ngOnInit();
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
