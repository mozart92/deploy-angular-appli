import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GeneralViewComponent} from './general-view.component';



const routes: Routes = [
  {
    path: '',
    component: GeneralViewComponent,
    data: {
      title: 'GeneralView'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralViewRoutingModule { }
