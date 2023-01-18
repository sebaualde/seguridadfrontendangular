import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecuperarPasswordComponent } from './recuperar-password.component';

const routes: Routes = [
  {path: '', component: RecuperarPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuperarPasswordRoutingModule { }
