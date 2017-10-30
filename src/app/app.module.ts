import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { HttpModule, RequestOptions } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { Material } from './material';

// withCredentials: true
import { AuthRequestOptions } from './service/AuthRequestOptions';

import { LoginService } from './service/login.service';
import { DefinitionsService } from './service/definitions.service';
import { EntitiesService } from './service/entities.service';
import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { DefinitionsComponent } from './main/definitions/definitions.component';
import { FieldDefinitionEditorComponent } from './editor/field-definition-editor/field-definition-editor.component';
import { EntitiesComponent } from './main/entities/entities.component';
import { EntityEditorComponent } from './editor/entity-editor/entity-editor.component';
import { FieldDirective } from './fields/field.directive';
import { FieldComponent } from './fields/field/field.component';

import { TextFieldComponent } from './fields/text-field/text-field.component';

const appRoutes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  //{ path: 'registry', component: RegistryComponent },

  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  //{ path: '**', component: HomeComponent }
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DefinitionsComponent,
    FieldDefinitionEditorComponent,
    EntitiesComponent,
    EntityEditorComponent,
    FieldDirective,
    FieldComponent,
    TextFieldComponent,
  ],
  entryComponents: [
    TextFieldComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Material,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    LoginService,
    DefinitionsService,
    EntitiesService,
    { provide: RequestOptions, useClass: AuthRequestOptions },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
