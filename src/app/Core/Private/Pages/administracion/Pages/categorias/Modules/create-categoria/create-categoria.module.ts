import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCategoriaRoutingModule } from './create-categoria-routing.module';
import { CreateCategoriaComponent } from './create-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowErrorListModule } from 'src/app/Core/Shared';


@NgModule({
  declarations: [
    CreateCategoriaComponent
  ],
  imports: [
    CommonModule,
    CreateCategoriaRoutingModule,

    ShowErrorListModule,

    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class CreateCategoriaModule { }
