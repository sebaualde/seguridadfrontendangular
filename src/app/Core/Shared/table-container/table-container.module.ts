import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableContainerRoutingModule } from './page-header-routing.module';
import { TableContainerComponent } from './table-container.component';

@NgModule({
  declarations: [TableContainerComponent],
  imports: [
    CommonModule,
    TableContainerRoutingModule,
    MatProgressSpinnerModule,
  ],
  exports: [TableContainerComponent]
})
export class TableContainerModule { }
