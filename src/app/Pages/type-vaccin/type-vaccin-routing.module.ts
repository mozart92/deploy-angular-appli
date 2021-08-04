import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TypeVaccinComponent} from './type-vaccin.component';



const routes: Routes = [
  {
    path: '',
    component: TypeVaccinComponent,
    data: {
      title: 'TypeVaccin'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TypeVaccinRoutingModule { }
