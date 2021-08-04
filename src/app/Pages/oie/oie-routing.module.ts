import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OIEComponent} from './oie.component';



const routes: Routes = [
  {
    path: '',
    component: OIEComponent,
    data: {
      title: 'OIE'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OIERoutingModule { }
