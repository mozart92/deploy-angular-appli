import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegionsRoutingModule} from '../../Pages/Configuration/regions/regions-routing.module';
import {PageTitleModule} from '../../Layout/Components/page-title/page-title.module';
import {LoadingModule} from '../../Loading/loading/loading.module';
import {RegionsComponent} from '../../Pages/Configuration/regions/regions.component';
import {FaqRoutingModule} from './faq-routing.module';
import {FaqComponent} from './faq.component';
import {FormatTextTooLongModule} from '../../Pipes/formatTextTooLong/format-text-too-long.module';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    FaqRoutingModule, PageTitleModule, LoadingModule, FormatTextTooLongModule
  ],
  declarations: [FaqComponent],
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
export class FaqModule { }
