import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListFichiersComponent} from './list-fichiers.component';



const routes: Routes = [
  {
    path: '',
    component: ListFichiersComponent,
    data: {
      title: 'ListFichiers'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListFichiersRoutingModule { }
