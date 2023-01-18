import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerErrorRoutingModule } from './server-error-routing.module';
import { ServerErrorComponent } from './server-error.component';
import { InfoPageMessageModule } from '../../../Shared/info-page-message/info-page-message.module';


@NgModule({
  declarations: [
    ServerErrorComponent
  ],
  imports: [
    CommonModule,
    ServerErrorRoutingModule,

    InfoPageMessageModule
  ]
})
export class ServerErrorModule { }
