import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GstNaturePrelevementComponent} from './gst-nature-prelevement.component';



const routes: Routes = [
  {
    path: '',
    component: GstNaturePrelevementComponent,
    data: {
      title: 'GstNaturePrelevement'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstNaturePrelevementRoutingModule { }
