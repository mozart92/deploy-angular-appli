import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MesuresControleComponent} from './mesures-controle.component';



const routes: Routes = [
  {
    path: '',
    component: MesuresControleComponent,
    data: {
      title: 'MesuresControle'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesuresControleRoutingModule { }
