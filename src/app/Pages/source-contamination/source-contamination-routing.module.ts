import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SourceContaminationComponent} from './source-contamination.component';



const routes: Routes = [
  {
    path: '',
    component: SourceContaminationComponent,
    data: {
      title: 'SourceContamination'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceContaminationRoutingModule { }
