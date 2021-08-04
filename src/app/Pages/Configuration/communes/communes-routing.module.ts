import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommuneComponent} from './commune.component';



const routes: Routes = [
  {
    path: '',
    component: CommuneComponent,
    data: {
      title: 'Communes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunesRoutingModule { }
