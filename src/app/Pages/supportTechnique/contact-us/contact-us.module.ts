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
import {ContactUsRoutingModule} from './contact-us-routing.module';
import {ContactUsComponent} from './contact-us.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule, PerfectScrollbarModule,
    ContactUsRoutingModule, PageTitleModule
  ],
  declarations: [ContactUsComponent],
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
export class ContactUsModule { }
