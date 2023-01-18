import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterMessageComponent } from './register-message.component';

const routes: Routes = [
  {path: '', component: RegisterMessageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterMessageRoutingModule { }
