import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, 
  MatTabsModule, MatListModule, MatGridListModule, MatIconModule, 
  MatSelectModule, MatChipsModule, MatCheckboxModule, MatDatepickerModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, 
    MatTabsModule, MatListModule, MatGridListModule, MatIconModule, 
    MatSelectModule, MatChipsModule, MatCheckboxModule, MatDatepickerModule
  ],
  exports: [
    MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, 
    MatTabsModule, MatListModule, MatGridListModule, MatIconModule, 
    MatSelectModule, MatChipsModule, MatCheckboxModule, MatDatepickerModule
  ],
})
export class Material { }