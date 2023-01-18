import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorizadoRoutingModule } from './autorizado-routing.module';
import { AutorizadoComponent } from './autorizado.component';


@NgModule({
  declarations: [
    AutorizadoComponent
  ],
  imports: [
    CommonModule,
    AutorizadoRoutingModule
  ],
  exports: [AutorizadoComponent]
})
export class AutorizadoModule { }
