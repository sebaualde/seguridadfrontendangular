import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaConfirmadaComponent } from './cuenta-confirmada.component';

const routes: Routes = [
  {path: '', component: CuentaConfirmadaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaConfirmadaRoutingModule { }
