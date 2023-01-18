import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePage } from 'src/app/Core/Data';
import { AdministracionComponent } from './administracion.component';

const routes: Routes = [
  {path: '', component: AdministracionComponent,
  children: [
    {path: '', loadChildren: () => import('./Pages').then((m) => m.AdministracionHomeModule)},
    {path: RoutePage.Categorias, loadChildren: () => import('./Pages').then((m) => m.CategoriasModule)},
    {path: RoutePage.Categorias+'/:message/:isSuccess', loadChildren: () => import('./Pages').then((m) => m.CategoriasModule)},
    {path: RoutePage.Usuarios, loadChildren: () => import('./Pages').then((m) => m.UsuariosModule)}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
