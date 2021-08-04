import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoadingComponent} from './loading.component';



const routes: Routes = [
  {
    path: '',
    component: LoadingComponent,
    data: {
      title: 'Loading'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadingRoutingModule { }
