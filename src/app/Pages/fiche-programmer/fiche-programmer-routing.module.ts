import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FicheProgrammerComponent} from './fiche-programmer.component';



const routes: Routes = [
  {
    path: '',
    component: FicheProgrammerComponent,
    data: {
      title: 'FicheProgrammer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FicheProgrammerRoutingModule { }
