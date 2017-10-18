import { Component, OnInit } from '@angular/core';

import { Router /*, ActivatedRoute, ParamMap*/ } from '@angular/router';

import { LoginService } from '../../service/login.service';

import { Logger } from '../../util/Logger';

const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

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
