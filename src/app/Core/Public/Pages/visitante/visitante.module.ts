import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitanteRoutingModule } from './visitante-routing.module';
import { VisitanteComponent } from './visitante.component';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    VisitanteComponent
  ],
  imports: [
    CommonModule,
    VisitanteRoutingModule,
    MatDividerModule
  ]
})
export class VisitanteModule { }
