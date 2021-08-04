import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiagramComparatifComponent} from './diagram-comparatif.component';


const routes: Routes = [
  {
    path: '',
    component: DiagramComparatifComponent,
    data: {
      title: 'DiagramComparatif'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagramComparatifRoutingModule { }
