import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InfoPageMessageModule } from '../../../Shared/info-page-message/info-page-message.module';
import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
import { UnauthorizedComponent } from './unauthorized.component';


@NgModule({
  declarations: [
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    UnauthorizedRoutingModule,

    InfoPageMessageModule
  ]
})
export class UnauthorizedModule { }
