import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProgrammesArchivesComponent} from './programmes-archives.component';


const routes: Routes = [
  {
    path: '',
    component: ProgrammesArchivesComponent,
    data: {
      title: 'ProgrammesArchives'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgrammesArchivesRoutingModule { }
