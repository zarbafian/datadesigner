import { NgModule } from '@angular/core';

import {MatButtonModule, MatSidenavModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatSidenavModule, MatInputModule],
  exports: [MatButtonModule, MatSidenavModule, MatInputModule],
})
export class Material { }