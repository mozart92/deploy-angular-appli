import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CZVSComponent} from './czvs.component';



const routes: Routes = [
  {
    path: '',
    component: CZVSComponent,
    data: {
      title: 'CZVS'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CZVSRoutingModule { }
