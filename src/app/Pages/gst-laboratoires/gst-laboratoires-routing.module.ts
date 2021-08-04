import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GstLaboratoiresComponent} from './gst-laboratoires.component';



const routes: Routes = [
  {
    path: '',
    component: GstLaboratoiresComponent,
    data: {
      title: 'GstLaboratoiresGuard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstLaboratoiresRoutingModule { }
