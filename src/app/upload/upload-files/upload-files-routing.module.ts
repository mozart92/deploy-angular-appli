import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MultimediaComponent} from '../../GestionContenuSiteWeb/multimedia/multimedia.component';
import {UploadFilesComponent} from './upload-files.component';



const routes: Routes = [
  {
    path: '',
    component: UploadFilesComponent,
    data: {
      title: 'UploadFiles'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFilesRoutingModule { }
