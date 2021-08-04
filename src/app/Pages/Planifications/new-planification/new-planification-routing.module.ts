import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewPlanificationComponent} from './new-planification.component';


const routes: Routes = [
  {
    path: '',
    component: NewPlanificationComponent,
    data: {
      title: 'NewPlanification'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPlanificationRoutingModule { }
