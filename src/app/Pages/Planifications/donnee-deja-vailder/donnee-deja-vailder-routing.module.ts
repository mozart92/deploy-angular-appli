import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DonneeDejaVailderComponent} from './donnee-deja-vailder.component';



const routes: Routes = [
  {
    path: '',
    component: DonneeDejaVailderComponent,
    data: {
      title: 'DonneeDejaVailder'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonneeDejaVailderRoutingModule { }
