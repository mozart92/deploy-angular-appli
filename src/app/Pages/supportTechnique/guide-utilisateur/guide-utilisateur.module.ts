import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FaqRoutingModule} from '../../../GestionContenuSiteWeb/faq/faq-routing.module';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {LoadingModule} from '../../../Loading/loading/loading.module';
import {FormatTextTooLongModule} from '../../../Pipes/formatTextTooLong/format-text-too-long.module';
import {FaqComponent} from '../../../GestionContenuSiteWeb/faq/faq.component';
import {GuideUtilisateurRoutingModule} from './guide-utilisateur-routing.module';
import {GuideUtilisateurComponent} from './guide-utilisateur.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule, PerfectScrollbarModule,
    GuideUtilisateurRoutingModule, PageTitleModule
  ],
  declarations: [GuideUtilisateurComponent],
  providers: [
    {
      provide:
      PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
      DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    }
  ],
})
export class GuideUtilisateurModule { }
