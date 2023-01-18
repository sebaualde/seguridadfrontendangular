import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoPageMessageRoutingModule } from './info-page-message-routing.module';
import { InfoPageMessageComponent } from './info-page-message.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    InfoPageMessageComponent
  ],
  imports: [
    CommonModule,
    InfoPageMessageRoutingModule,

    MatIconModule
  ],
  exports: [InfoPageMessageComponent]
})
export class InfoPageMessageModule { }
