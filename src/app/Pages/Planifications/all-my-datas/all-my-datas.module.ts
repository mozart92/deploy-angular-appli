import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {FormatTextTooLongModule} from '../../../Pipes/formatTextTooLong/format-text-too-long.module';
import {AllMyDatasComponent} from './all-my-datas.component';
import {AllMyDatasRoutingModule} from './all-my-datas-routing.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



@NgModule({
  imports: [
    CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    AllMyDatasRoutingModule, PageTitleModule, FormatTextTooLongModule, Ng2SearchPipeModule
  ],
  declarations: [AllMyDatasComponent],
  providers: [
    {
      provide:
      PERFECT_SCROLLBAR_CONFIG,
      useValue:
      DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class AllMyDatasModule { }
