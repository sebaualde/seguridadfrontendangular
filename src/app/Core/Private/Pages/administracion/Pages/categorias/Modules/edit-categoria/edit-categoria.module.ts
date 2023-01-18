import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCategoriaRoutingModule } from './edit-categoria-routing.module';
import { EditCategoriaComponent } from './edit-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowErrorListModule, ShowMessageModule } from 'src/app/Core/Shared';


@NgModule({
  declarations: [
    EditCategoriaComponent
  ],
  imports: [
    CommonModule,
    EditCategoriaRoutingModule,

    ShowErrorListModule,
    ShowMessageModule,

    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class EditCategoriaModule { }
