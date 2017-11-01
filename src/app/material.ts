import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, 
  MatTabsModule, MatListModule, MatGridListModule, MatIconModule, 
  MatSelectModule, MatChipsModule, MatCheckboxModule, MatDatepickerModule,
  MatButtonToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, 
    MatTabsModule, MatListModule, MatGridListModule, MatIconModule, 
    MatSelectModule, MatChipsModule, MatCheckboxModule, MatDatepickerModule,
    MatButtonToggleModule
  ],
  exports: [
    MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, 
    MatTabsModule, MatListModule, MatGridListModule, MatIconModule, 
    MatSelectModule, MatChipsModule, MatCheckboxModule, MatDatepickerModule,
    MatButtonToggleModule
  ],
})
export class Material { }