import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaCategoriasComponent } from './cuenta-categorias.component';

const routes: Routes = [
  {path: '', component: CuentaCategoriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaCategoriasRoutingModule { }
