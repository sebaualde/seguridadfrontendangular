import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorTestsRoutingModule } from './error-tests-routing.module';
import { ErrorTestsComponent } from './error-tests.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowErrorListModule } from 'src/app/Core/Shared';


@NgModule({
  declarations: [
    ErrorTestsComponent
  ],
  imports: [
    CommonModule,
    ErrorTestsRoutingModule,

    ShowErrorListModule,

    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class ErrorTestsModule { }
