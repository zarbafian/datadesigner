import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, 
  MatTabsModule, MatListModule, MatGridListModule, MatIconModule, 
  MatSelectModule, MatChipsModule, MatCheckboxModule, MatButtonToggleModule,
  MatDatepickerModule, MatNativeDateModule,
  MatTableModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, 
    MatTabsModule, MatListModule, MatGridListModule, MatIconModule, 
    MatSelectModule, MatChipsModule, MatCheckboxModule, MatButtonToggleModule,
    MatDatepickerModule, MatNativeDateModule,
    MatTableModule,
  ],
  exports: [
    MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, 
    MatTabsModule, MatListModule, MatGridListModule, MatIconModule, 
    MatSelectModule, MatChipsModule, MatCheckboxModule, MatButtonToggleModule,
    MatDatepickerModule, MatNativeDateModule,
    MatTableModule,
  ],
})
export class Material { }