import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ExportationDatasComponent} from '../visualisationDesDonnees/exportation-datas/exportation-datas.component';
import {ExportDatasEncourComponent} from './export-datas-encour.component';



const routes: Routes = [
  {
    path: '',
    component: ExportDatasEncourComponent,
    data: {
      title: 'ExportationDate'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportDatasEncourRoutingModule { }
