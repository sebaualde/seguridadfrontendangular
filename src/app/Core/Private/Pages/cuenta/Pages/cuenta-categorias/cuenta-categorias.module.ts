import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaCategoriasRoutingModule } from './cuenta-categorias-routing.module';
import { CuentaCategoriasComponent } from './cuenta-categorias.component';
import { ListCategoriasModule } from '../../../administracion/Pages/categorias/Modules/list-categorias/list-categorias.module';


@NgModule({
  declarations: [
    CuentaCategoriasComponent
  ],
  imports: [
    CommonModule,
    CuentaCategoriasRoutingModule,

    ListCategoriasModule
  ]
})
export class CuentaCategoriasModule { }
