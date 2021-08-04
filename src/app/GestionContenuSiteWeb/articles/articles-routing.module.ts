import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegionsComponent} from '../../Pages/Configuration/regions/regions.component';
import {ArticlesComponent} from './articles.component';



const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    data: {
      title: 'Articles'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
