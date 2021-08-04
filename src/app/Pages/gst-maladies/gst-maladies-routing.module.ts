import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GstMaladiesComponent} from './gst-maladies.component';



const routes: Routes = [
  {
    path: '',
    component: GstMaladiesComponent,
    data: {
      title: 'GstMaladies'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstMaladiesRoutingModule { }
