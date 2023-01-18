import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePage } from './Core/Data';
import { EsAdminGuard } from './Security/Guards';
import { RegistradoGuard } from './Security/Guards/registrado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutePage.Inicio,
    pathMatch: 'full',
  },
  //paginas publicas
  { path: RoutePage.Inicio,  loadChildren: () => import('./Core').then((m) => m.VisitanteModule)},
  { path: RoutePage.Login,  loadChildren: () => import('./Core').then((m) => m.LoginModule)},
  { path: RoutePage.Login+"/:message",  loadChildren: () => import('./Core').then((m) => m.LoginModule)},
  { path: RoutePage.Registro,  loadChildren: () => import('./Core').then((m) => m.RegistroModule)},
  { path: RoutePage.ResetPassword,  loadChildren: () => import('./Core').then((m) => m.ResetPasswordModule)},
  { path: RoutePage.RecuperarPassword,  loadChildren: () => import('./Core').then((m) => m.RecuperarPasswordModule)},
  { path: RoutePage.RegisterMessage + "/:isSuccess",  loadChildren: () => import('./Core').then((m) => m.RegisterMessageModule)},
  { path: RoutePage.CuentaConfirmada + "/:isSuccess",  loadChildren: () => import('./Core').then((m) => m.CuentaConfirmadaModule)},

  //paginas privadas
  { path: RoutePage.Cuenta, loadChildren: () => import('./Core').then((m) => m.CuentaModule), canActivate: [RegistradoGuard]},
  { path: RoutePage.Administracion, loadChildren: () => import('./Core').then((m) => m.AdministracionModule), canActivate: [EsAdminGuard]},
  { path: RoutePage.Categorias, loadChildren: () => import('./Core').then((m) => m.CategoriasModule)},

  //paginas de error
  { path: RoutePage.ErrorTests,  loadChildren: () => import('./Core').then((m) => m.ErrorTestsModule)},
  { path: RoutePage.Unauthorized,  loadChildren: () => import('./Core').then((m) => m.UnauthorizedModule)},
  { path: RoutePage.NotFound,  loadChildren: () => import('./Core').then((m) => m.NotFoundModule)},
  { path: RoutePage.ServerError,  loadChildren: () => import('./Core').then((m) => m.ServerErrorModule)},

  { path: '**', redirectTo:RoutePage.NotFound },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
