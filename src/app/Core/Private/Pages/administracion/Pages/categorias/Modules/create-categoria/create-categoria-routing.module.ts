import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoriaComponent } from './create-categoria.component';

const routes: Routes = [
  {path: '', component: CreateCategoriaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCategoriaRoutingModule { }
