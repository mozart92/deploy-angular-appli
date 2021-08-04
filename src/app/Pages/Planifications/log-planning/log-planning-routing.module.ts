import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AllPlanificationsComponent} from '../all-planifications/all-planifications.component';
import {LogPlanningComponent} from './log-planning.component';



const routes: Routes = [
  {
    path: '',
    component: LogPlanningComponent,
    data: {
      title: 'AllPlanifications'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogPlanningRoutingModule { }
