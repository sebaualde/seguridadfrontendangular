import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPageMessageComponent } from './info-page-message.component';

const routes: Routes = [
  {path: '', component: InfoPageMessageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoPageMessageRoutingModule { }
