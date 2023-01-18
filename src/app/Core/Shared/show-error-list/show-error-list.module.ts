import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowErrorListRoutingModule } from './show-error-list-routing.module';
import { ShowErrorListComponent } from './show-error-list.component';


@NgModule({
  declarations: [
    ShowErrorListComponent
  ],
  imports: [
    CommonModule,
    ShowErrorListRoutingModule
  ],
  exports: [ShowErrorListComponent]
})
export class ShowErrorListModule { }
