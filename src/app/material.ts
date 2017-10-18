import { NgModule } from '@angular/core';

import {MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule],
  exports: [MatButtonModule, MatSidenavModule, MatInputModule, MatToolbarModule],
})
export class Material { }