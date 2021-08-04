import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FaqComponent} from '../../../GestionContenuSiteWeb/faq/faq.component';
import {ContactUsComponent} from './contact-us.component';



const routes: Routes = [
  {
    path: '',
    component: ContactUsComponent,
    data: {
      title: 'ContactUs'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
