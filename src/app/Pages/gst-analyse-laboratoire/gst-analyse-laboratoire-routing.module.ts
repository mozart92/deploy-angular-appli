import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GstAnalyseLaboratoireComponent} from './gst-analyse-laboratoire.component';



const routes: Routes = [
  {
    path: '',
    component: GstAnalyseLaboratoireComponent,
    data: {
      title: 'GstAnalyseLaboratoire'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstAnalyseLaboratoireRoutingModule { }
