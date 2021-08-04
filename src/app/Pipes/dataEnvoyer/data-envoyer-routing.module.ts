import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataEnvoyerComponent} from '../../Pages/Planifications/data-envoyer/data-envoyer.component';



const routes: Routes = [
  {
    path: '',
    component: DataEnvoyerComponent,
    data: {
      title: 'DataEnvoyer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataEnvoyerRoutingModule { }
