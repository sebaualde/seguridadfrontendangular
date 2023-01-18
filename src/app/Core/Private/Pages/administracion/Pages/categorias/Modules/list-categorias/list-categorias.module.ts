import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCategoriasRoutingModule } from './list-categorias-routing.module';
import { ListCategoriasComponent } from './list-categorias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableContainerModule, ShowMessageModule } from 'src/app/Core/Shared';
import { AutorizadoModule } from '../../../../../../../../Security/Modules/autorizado/autorizado.module';


@NgModule({
  declarations: [
    ListCategoriasComponent
  ],
  imports: [
    CommonModule,
    ListCategoriasRoutingModule,

    TableContainerModule,
    ShowMessageModule,
    AutorizadoModule,

    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    ListCategoriasComponent
  ]
})
export class ListCategoriasModule { }
