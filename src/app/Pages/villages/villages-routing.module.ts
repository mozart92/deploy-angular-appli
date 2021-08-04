import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DepartementsComponent} from '../Configuration/departements/departements.component';
import {VillagesComponent} from './villages.component';



const routes: Routes = [
  {
    path: '',
    component: VillagesComponent,
    data: {
      title: 'Villages'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VillagesRoutingModule { }
