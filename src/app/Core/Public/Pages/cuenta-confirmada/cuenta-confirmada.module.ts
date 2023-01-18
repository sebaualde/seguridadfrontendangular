import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaConfirmadaRoutingModule } from './cuenta-confirmada-routing.module';
import { CuentaConfirmadaComponent } from './cuenta-confirmada.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InfoPageMessageModule } from '../../../Shared/info-page-message/info-page-message.module';


@NgModule({
  declarations: [
    CuentaConfirmadaComponent
  ],
  imports: [
    CommonModule,
    CuentaConfirmadaRoutingModule,

    InfoPageMessageModule,
    MatButtonModule
  ]
})
export class CuentaConfirmadaModule { }
