import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NouvelleFicheComponent} from './nouvelle-fiche.component';



const routes: Routes = [
  {
    path: '',
    component: NouvelleFicheComponent,
    data: {
      title: 'NouvelleFiche'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NouvelleFicheRoutingModule { }
