import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionHomeRoutingModule } from './administracion-home-routing.module';
import { AdministracionHomeComponent } from './administracion-home.component';


@NgModule({
  declarations: [
    AdministracionHomeComponent
  ],
  imports: [
    CommonModule,
    AdministracionHomeRoutingModule
  ]
})
export class AdministracionHomeModule { }
