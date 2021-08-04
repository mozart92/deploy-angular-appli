import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemProductionComponent} from './system-production.component';



const routes: Routes = [
  {
    path: '',
    component: SystemProductionComponent,
    data: {
      title: 'SystemProduction'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemProductionRoutingModule { }
