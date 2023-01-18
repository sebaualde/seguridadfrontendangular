import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InfoPageMessageModule } from '../../../Shared/info-page-message/info-page-message.module';
import { RegisterMessageRoutingModule } from './register-message-routing.module';
import { RegisterMessageComponent } from './register-message.component';


@NgModule({
  declarations: [
    RegisterMessageComponent
  ],
  imports: [
    CommonModule,
    RegisterMessageRoutingModule,

    InfoPageMessageModule
  ]
})
export class RegisterMessageModule { }
