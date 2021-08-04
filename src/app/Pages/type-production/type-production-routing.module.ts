import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TypeProductionComponent} from './type-production.component';



const routes: Routes = [
  {
    path: '',
    component: TypeProductionComponent,
    data: {
      title: 'TypeProduction'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeProductionRoutingModule { }
