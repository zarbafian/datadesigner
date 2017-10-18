import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { HttpModule, RequestOptions }    from '@angular/http';

import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { Material } from './material';

// withCredentials: true
import { AuthRequestOptions } from './service/AuthRequestOptions';

import { LoginService } from './service/login.service';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';

const appRoutes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  //{ path: 'registry', component: RegistryComponent },
 
  { path: '',   redirectTo: '/signin', pathMatch: 'full' },
  //{ path: '**', component: HomeComponent }
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Material,
    HttpModule,
    FormsModule,

    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    LoginService,
    { provide: RequestOptions, useClass: AuthRequestOptions},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
