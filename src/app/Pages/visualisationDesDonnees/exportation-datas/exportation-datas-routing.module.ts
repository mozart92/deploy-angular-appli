import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExportationDatasComponent} from './exportation-datas.component';



const routes: Routes = [
  {
    path: '',
    component: ExportationDatasComponent,
    data: {
      title: 'ExportationDate'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportationDatasRoutingModule { }
