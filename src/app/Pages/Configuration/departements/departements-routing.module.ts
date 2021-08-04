import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DepartementsComponent} from './departements.component';


const routes: Routes = [
  {
    path: '',
    component: DepartementsComponent,
    data: {
      title: 'Departements'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartementsRoutingModule { }
