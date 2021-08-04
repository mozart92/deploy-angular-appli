import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegionsComponent} from '../../Pages/Configuration/regions/regions.component';
import {FaqComponent} from './faq.component';



const routes: Routes = [
  {
    path: '',
    component: FaqComponent,
    data: {
      title: 'Faq'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }
