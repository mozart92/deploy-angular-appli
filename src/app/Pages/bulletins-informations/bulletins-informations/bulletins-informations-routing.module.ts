import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BulletinsInformationsComponent} from './bulletins-informations.component';



const routes: Routes = [
  {
    path: '',
    component: BulletinsInformationsComponent,
    data: {
      title: 'BulletinsInformations'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulletinsInformationsRoutingModule { }
