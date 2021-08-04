import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FaqComponent} from '../../../GestionContenuSiteWeb/faq/faq.component';
import {GuiAdministrationComponent} from './gui-administration.component';



const routes: Routes = [
  {
    path: '',
    component: GuiAdministrationComponent,
    data: {
      title: 'GuiAdministration'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuiAdministrationRoutingModule { }
