import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaInicioRoutingModule } from './cuenta-inicio-routing.module';
import { CuentaInicioComponent } from './cuenta-inicio.component';


@NgModule({
  declarations: [
    CuentaInicioComponent
  ],
  imports: [
    CommonModule,
    CuentaInicioRoutingModule
  ]
})
export class CuentaInicioModule { }
