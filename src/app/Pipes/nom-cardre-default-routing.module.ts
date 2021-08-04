import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NomCardreDefaultPipe} from './nom-cardre-default.pipe';



const routes: Routes = [
  {
    path: '',
    component: NomCardreDefaultPipe,
    data: {
      title: 'NomCardreDefaul'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomCardreDefaultRoutingModule { }
