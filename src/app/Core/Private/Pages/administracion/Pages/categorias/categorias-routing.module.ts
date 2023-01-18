import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePage } from 'src/app/Core/Data';
import { CategoriasComponent } from './categorias.component';

const routes: Routes = [
  { path: "", component: CategoriasComponent,
    children: [
      { path: "",  loadChildren: () => import('./Modules').then(m => m.ListCategoriasModule)},
      { path: RoutePage.CreateCategoria,  loadChildren: () => import('./Modules').then(m => m.CreateCategoriaModule)},
      { path: RoutePage.EditCategoria+'/:id',  loadChildren: () => import('./Modules').then(m => m.EditCategoriaModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
