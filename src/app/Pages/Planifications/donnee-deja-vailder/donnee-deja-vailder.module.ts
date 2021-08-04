import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {FormatTextTooLongModule} from '../../../Pipes/formatTextTooLong/format-text-too-long.module';
import {LoadingModule} from '../../../Loading/loading/loading.module';
import {UpdateDatasModule} from '../../update-datas/update-datas.module';
import {DonneeDejaVailderRoutingModule} from './donnee-deja-vailder-routing.module';
import {DonneeDejaVailderComponent} from './donnee-deja-vailder.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    DonneeDejaVailderRoutingModule, PageTitleModule,
    FormatTextTooLongModule, LoadingModule, UpdateDatasModule, Ng2SearchPipeModule
  ],
  declarations: [DonneeDejaVailderComponent],
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
export class DonneeDejaVailderModule { }
