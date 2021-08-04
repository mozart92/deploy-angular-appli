import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FaqComponent} from '../../../GestionContenuSiteWeb/faq/faq.component';
import {GuideUtilisateurComponent} from './guide-utilisateur.component';


const routes: Routes = [
  {
    path: '',
    component: GuideUtilisateurComponent,
    data: {
      title: 'GuideUtilisateur'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideUtilisateurRoutingModule { }
