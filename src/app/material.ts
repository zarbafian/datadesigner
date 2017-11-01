import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, 
  MatTabsModule, MatListModule, MatGridListModule, MatIconModule, 
  MatSelectModule, MatChipsModule, MatCheckboxModule, MatButtonToggleModule,
  MatDatepickerModule, MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, 
    MatTabsModule, MatListModule, MatGridListModule, MatIconModule, 
    MatSelectModule, MatChipsModule, MatCheckboxModule, MatButtonToggleModule,
    MatDatepickerModule, MatNativeDateModule
  ],
  exports: [
    MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, 
    MatTabsModule, MatListModule, MatGridListModule, MatIconModule, 
    MatSelectModule, MatChipsModule, MatCheckboxModule, MatButtonToggleModule,
    MatDatepickerModule, MatNativeDateModule
  ],
})
export class Material { }