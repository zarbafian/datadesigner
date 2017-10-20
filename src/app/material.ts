import { NgModule } from '@angular/core';

import {MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, MatTabsModule, MatListModule, MatGridListModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, MatTabsModule, MatListModule, MatGridListModule, MatIconModule],
  exports: [MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, MatTabsModule, MatListModule, MatGridListModule, MatIconModule],
})
export class Material { }