import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowErrorListModule } from 'src/app/Core/Shared';
import { RecuperarPasswordRoutingModule } from './recuperar-password-routing.module';
import { RecuperarPasswordComponent } from './recuperar-password.component';


@NgModule({
  declarations: [
    RecuperarPasswordComponent
  ],
  imports: [
    CommonModule,
    RecuperarPasswordRoutingModule,

    ShowErrorListModule,

    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class RecuperarPasswordModule { }
