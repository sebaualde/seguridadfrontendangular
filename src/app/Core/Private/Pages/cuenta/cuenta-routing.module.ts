import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaComponent } from './cuenta.component';
import { RoutePage } from '../../../Data/RoutePages';

const routes: Routes = [
  {path: '', component: CuentaComponent,
    children: [
      {path: '', loadChildren: () => import('./Pages').then((m) => m.CuentaInicioModule)},
      {path: RoutePage.CuentaCategorias, loadChildren: () => import('./Pages').then((m) => m.CuentaCategoriasModule)},
      {path: RoutePage.CambiarPassword, loadChildren: () => import('./Pages').then((m) => m.ChangePasswordModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
