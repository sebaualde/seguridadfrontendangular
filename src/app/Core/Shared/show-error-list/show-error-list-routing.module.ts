import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowErrorListComponent } from './show-error-list.component';

const routes: Routes = [
  {path: '', component: ShowErrorListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowErrorListRoutingModule { }
