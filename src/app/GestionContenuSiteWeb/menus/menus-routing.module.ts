import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegionsComponent} from '../../Pages/Configuration/regions/regions.component';
import {MenusComponent} from './menus.component';



const routes: Routes = [
  {
    path: '',
    component: MenusComponent,
    data: {
      title: 'Menus'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
