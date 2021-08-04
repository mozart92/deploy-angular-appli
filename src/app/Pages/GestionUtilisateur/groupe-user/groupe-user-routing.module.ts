import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupeUserComponent} from './groupe-user.component';



const routes: Routes = [
  {
    path: '',
    component: GroupeUserComponent,
    data: {
      title: 'GroupeUsers'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupeUserRoutingModule { }
