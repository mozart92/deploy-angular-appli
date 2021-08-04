import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UpdateDatasComponent} from './update-datas.component';



const routes: Routes = [
  {
    path: '',
    component: UpdateDatasComponent,
    data: {
      title: 'UpdateDatas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateDatasRoutingModule { }
