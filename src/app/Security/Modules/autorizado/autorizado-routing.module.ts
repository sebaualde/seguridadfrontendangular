import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorizadoComponent } from './autorizado.component';

const routes: Routes = [
  {path: '', component: AutorizadoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorizadoRoutingModule { }
