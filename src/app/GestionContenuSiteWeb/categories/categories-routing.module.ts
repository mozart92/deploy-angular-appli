import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegionsComponent} from '../../Pages/Configuration/regions/regions.component';
import {CategoriesComponent} from './categories.component';



const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    data: {
      title: 'Categories'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
