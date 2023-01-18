import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaInicioComponent } from './cuenta-inicio.component';

const routes: Routes = [
  {path: '', component: CuentaInicioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaInicioRoutingModule { }
