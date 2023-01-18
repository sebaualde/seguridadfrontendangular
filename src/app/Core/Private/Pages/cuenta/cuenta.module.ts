import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { CuentaComponent } from './cuenta.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CuentaComponent
  ],
  imports: [
    CommonModule,
    CuentaRoutingModule,

    MatSidenavModule,
    MatButtonModule
  ]
})
export class CuentaModule { }
