import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataReceiveComponent} from './data-receive.component';



const routes: Routes = [
  {
    path: '',
    component: DataReceiveComponent,
    data: {
      title: 'DataReceive'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataReceiveRoutingModule { }
