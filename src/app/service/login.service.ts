import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from 'app/data/User';
import { Role } from 'app/data/Role';

const API_URL = 'http://localhost:8080';

@Injectable()
export class LoginService {

  private loginUrl = API_URL + '/login';
  private logoutUrl = API_URL + '/logout';
  private principalUrl = API_URL + '/api/principal';
  private apiUrl = API_URL + '/api/status';
  private apiAdminUrl = API_URL + '/admin/status';

  //private headers = new Headers();
  //private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }
  
  login(credentials) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let user = "username=" + credentials.username + "&password=" + credentials.password;
    
    return this.http
                .post(
                  this.loginUrl, 
                  user, 
                  {
                    //withCredentials: true,
                    headers: headers
                  }
                )
                .map(
                  resp => resp
                );
  }

  logout() {
  
    let headers = new Headers();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //let user = "username=" + credentials.username + "&password=" + credentials.password;
    
    return this.http
                .post(
                  this.logoutUrl, 
                  {}, 
                  {
                    //withCredentials: true,
                    headers: headers
                  }
                )
                .map(
                  resp => resp
                );
  }

  getPrincipal() {

    let user = this.getPrincipalEx().subscribe(user => {
      console.log('user returned: name=' + user.name + ', roles=' + user.roles);
    });
  }
  getPrincipalEx(): Observable<User> {
    return this.http
            .get(
              this.principalUrl
            )
            .map(
              resp => {
                try {
                  let user: User = <User>resp.json();
                  return user;
                } catch(e) {
                  let anon = new User();
                  anon.roles.push(Role.ANONYMOUS);
                  return anon;
                }
              }
            );
  }

  isApiUp() {
    this.http
            .get(
              this.apiUrl
            )
            .map(
              resp => resp
            )
            .subscribe( 
              data => console.log('isApiUp - received: ' + data)
            )
  }

  isAdminApiUp() {
    this.http
            .get(
              this.apiAdminUrl
            )
            .map(
              resp => resp
            )
            .subscribe( 
              data => console.log('isAdminApiUp - received: ' + data)
            )
  }
  
  loginSuccess(resp) {
    console.log('login success: ' + resp);
    return resp;
  }
  
  logoutSuccess(resp) {
    console.log('logout success:  ' + resp);
    //return Promise.resolve(resp);
  }
  logError(err) {
    console.log('login error: ' + err);
  }
}


