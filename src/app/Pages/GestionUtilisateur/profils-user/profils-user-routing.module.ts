import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilsUserComponent} from './profils-user.component';



const routes: Routes = [
  {
    path: '',
    component: ProfilsUserComponent,
    data: {
      title: 'ProfilsUser'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilsUserRoutingModule { }
