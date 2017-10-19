import { NgModule } from '@angular/core';

import {MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, MatTabsModule, MatListModule, MatGridListModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, MatTabsModule, MatListModule, MatGridListModule],
  exports: [MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule, MatTabsModule, MatListModule, MatGridListModule],
})
export class Material { }