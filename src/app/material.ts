import { NgModule } from '@angular/core';

import {MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, MatTabsModule, MatListModule, MatGridListModule, MatIconModule, MatSelectModule, MatChipsModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, MatTabsModule, MatListModule, MatGridListModule, MatIconModule, MatSelectModule, MatChipsModule],
  exports: [MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, MatTabsModule, MatListModule, MatGridListModule, MatIconModule, MatSelectModule, MatChipsModule],
})
export class Material { }