import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { HttpModule, RequestOptions } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { Material } from './material';

// TODO: move
import { MAT_DATE_LOCALE } from '@angular/material';

// withCredentials: true
import { AuthRequestOptions } from './service/AuthRequestOptions';

import { LoginService } from './service/login.service';
import { DefinitionsService } from './service/definitions.service';
import { EntitiesService } from './service/entities.service';
import { DataExchangeService } from './service/data-exchange.service';

import { HomeComponent } from './main/home/home.component';
import { LoginComponent } from './main/login/login.component';
import { DefinitionsComponent } from './main/definitions/definitions.component';
import { FieldDefinitionEditorComponent } from './editor/field-definition-editor/field-definition-editor.component';
import { EntitiesComponent } from './main/entities/entities.component';
import { EntityEditorComponent } from './editor/entity-editor/entity-editor.component';
import { FieldDirective } from './fields/field.directive';
import { FieldComponent } from './fields/field/field.component';

import { TextFieldComponent } from './fields/text-field/text-field.component';
import { YesnoFieldComponent } from './fields/yesno-field/yesno-field.component';
import { ParagraphFieldComponent } from './fields/paragraph-field/paragraph-field.component';
import { DecimalFieldComponent } from './fields/decimal-field/decimal-field.component';
import { IntegerFieldComponent } from './fields/integer-field/integer-field.component';
import { FileFieldComponent } from './fields/file-field/file-field.component';
import { EntityFieldComponent } from './fields/entity-field/entity-field.component';
import { DateFieldComponent } from './fields/date-field/date-field.component';
import { DatetimeFieldComponent } from './fields/datetime-field/datetime-field.component';

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
    YesnoFieldComponent,
    ParagraphFieldComponent,
    DecimalFieldComponent,
    IntegerFieldComponent,
    FileFieldComponent,
    EntityFieldComponent,
    DateFieldComponent,
    DatetimeFieldComponent,
  ],
  entryComponents: [
    TextFieldComponent,
    YesnoFieldComponent,
    ParagraphFieldComponent,
    DecimalFieldComponent,
    IntegerFieldComponent,
    FileFieldComponent,
    EntityFieldComponent,
    DateFieldComponent,
    DatetimeFieldComponent
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
    DataExchangeService,
    { provide: RequestOptions, useClass: AuthRequestOptions },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
