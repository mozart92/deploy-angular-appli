import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllMyDatasComponent} from './all-my-datas.component';


const routes: Routes = [
  {
    path: '',
    component: AllMyDatasComponent,
    data: {
      title: 'AllMyDatas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllMyDatasRoutingModule { }
