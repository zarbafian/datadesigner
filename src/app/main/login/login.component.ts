import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Config } from '../../util/Config';
import { Logger } from '../../util/Logger';

import { LoginService } from '../../service/login.service';

const LOGGER: Logger = Logger.getLogger();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    // TODO: Remove !
    username = 'poz';
    password = 'poz';
    //username = '';
    //password = '';

    constructor(
      private loginService: LoginService,
      private router: Router
    ) {}

    //model = { username: this.username, password: this.password };

    onSubmitLogin() {
      LOGGER.debug('LoginComponent.onSubmitLogin');
      
      let creds = {username: this.username, password: this.password};
      this.loginService
      .login(creds)
      .map(da => da)
      .subscribe(
        data => {
          LOGGER.debug('LoginComponent - login successful: ' + data)
          this.router.navigate(['/home']);
        }
      )
      ;
    }

    ngOnInit(){
        if(Config.isDevMode()) {
            //this.onSubmitLogin();
        }
    }
}
