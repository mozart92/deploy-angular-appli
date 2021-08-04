import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GstEspecesComponent} from './gst-especes.component';



const routes: Routes = [
  {
    path: '',
    component: GstEspecesComponent,
    data: {
      title: 'GstEspeces'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstEspecesRoutingModule { }
