import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../service/login.service';

import { Logger } from '../../util/Logger';

const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  username: string = 'poz';
  password: string = 'poz';

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
  
  onSubmitLogin() {
    LOGGER.debug('HomeComponent.onSubmitLogin');
    console.log('onSubmitLogin');
    
    let creds = {username: this.username, password: this.password};
    this.loginService
    .login(creds)
    /* .subscribe(
      data => console.log('DATA: ' + data)
    ) */
    ;
  }
  
  logout() {
    LOGGER.debug('HomeComponent.logout');
    this.loginService
                .logout()
                /* .subscribe(
                  data => console.log('DATA: ' + data)
                ) */
                ;
  }
}
