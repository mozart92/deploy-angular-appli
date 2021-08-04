import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GstMaladiesComponent} from '../../gst-maladies/gst-maladies.component';
import {UpdateProfilComponent} from './update-profil.component';



const routes: Routes = [
  {
    path: '',
    component: UpdateProfilComponent,
    data: {
      title: 'UpdateProfil'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateProfilRoutingModule { }
