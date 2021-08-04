import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FaqComponent} from '../../../GestionContenuSiteWeb/faq/faq.component';
import {FAQDSUpportComponent} from './faqdsupport.component';



const routes: Routes = [
  {
    path: '',
    component: FAQDSUpportComponent,
    data: {
      title: 'FAQDSUpport'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqdsupportRoutingModule { }
