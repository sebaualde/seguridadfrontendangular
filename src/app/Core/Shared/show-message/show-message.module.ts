import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowMessageRoutingModule } from './show-message-routing.module';
import { ShowMessageComponent } from './show-message.component';


@NgModule({
  declarations: [
    ShowMessageComponent
  ],
  imports: [
    CommonModule,
    ShowMessageRoutingModule
  ],
  exports: [ShowMessageComponent]
})
export class ShowMessageModule { }
