import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowMessageComponent } from './show-message.component';

const routes: Routes = [
  { path: '', component: ShowMessageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowMessageRoutingModule { }
