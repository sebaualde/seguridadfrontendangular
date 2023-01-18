import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorTestsComponent } from './error-tests.component';

const routes: Routes = [
  {path: '', component: ErrorTestsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorTestsRoutingModule { }
