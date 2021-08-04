import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllPlanificationsComponent} from './all-planifications.component';



const routes: Routes = [
  {
    path: '',
    component: AllPlanificationsComponent,
    data: {
      title: 'AllPlanifications'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllPlanificationsRoutingModule { }
