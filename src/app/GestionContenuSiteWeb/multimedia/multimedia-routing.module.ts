import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegionsComponent} from '../../Pages/Configuration/regions/regions.component';
import {MultimediaComponent} from './multimedia.component';



const routes: Routes = [
  {
    path: '',
    component: MultimediaComponent,
    data: {
      title: 'Multimedia'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultimediaRoutingModule { }
