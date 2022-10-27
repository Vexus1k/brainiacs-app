import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./modules/list-module/components/list/list.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: "full"},
  {path: 'home', children: []},
  {path: 'list', loadChildren: () => import('./modules/list-module/list.module').then(m => m.ListModule)},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
