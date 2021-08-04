import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FaqRoutingModule} from '../../../GestionContenuSiteWeb/faq/faq-routing.module';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {LoadingModule} from '../../../Loading/loading/loading.module';
import {FormatTextTooLongModule} from '../../../Pipes/formatTextTooLong/format-text-too-long.module';
import {FaqComponent} from '../../../GestionContenuSiteWeb/faq/faq.component';
import {FaqdsupportRoutingModule} from './faqdsupport-routing.module';
import {FAQDSUpportComponent} from './faqdsupport.component';
import {TranslateContenuModule} from '../../../Pipes/translateContenu/translate-contenu.module';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule, PerfectScrollbarModule,
    FaqdsupportRoutingModule, PageTitleModule, TranslateContenuModule, NgbAccordionModule, NgbModule
  ],
  declarations: [FAQDSUpportComponent],
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
export class FaqdsupportModule { }
