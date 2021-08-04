import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GstPathologiesComponent} from './gst-pathologies.component';



const routes: Routes = [
  {
    path: '',
    component: GstPathologiesComponent,
    data: {
      title: 'GstPathologies'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstPathologiesRoutingModule { }
