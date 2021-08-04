import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HistogramCollecteComponent} from './histogram-collecte.component';



const routes: Routes = [
  {
    path: '',
    component: HistogramCollecteComponent,
    data: {
      title: 'HistogramCollecte'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistogramCollecteRoutingModule { }
