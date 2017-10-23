import { NgModule } from '@angular/core';

import {MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, MatTabsModule, MatListModule, MatGridListModule, MatIconModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, MatTabsModule, MatListModule, MatGridListModule, MatIconModule, MatSelectModule],
  exports: [MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, MatTabsModule, MatListModule, MatGridListModule, MatIconModule, MatSelectModule],
})
export class Material { }