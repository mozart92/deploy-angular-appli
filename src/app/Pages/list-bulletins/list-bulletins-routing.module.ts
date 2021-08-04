import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListBulletinsComponent} from './list-bulletins.component';


const routes: Routes = [
  {
    path: '',
    component: ListBulletinsComponent,
    data: {
      title: 'ListBulletins'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBulletinsRoutingModule { }
