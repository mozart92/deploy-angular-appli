import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NomCardreDefaultModule} from '../../Pipes/nom-cardre-default.module';
import {FormatTypeInputModule} from '../fiche-programmer/format-type-input.module';
import {PageTitleModule} from '../../Layout/Components/page-title/page-title.module';
import {LoadingModule} from '../../Loading/loading/loading.module';
import {UpdateDatasRoutingModule} from './update-datas-routing.module';
import {UpdateDatasComponent} from './update-datas.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    UpdateDatasRoutingModule, NomCardreDefaultModule, FormatTypeInputModule, PageTitleModule, LoadingModule
  ],
  declarations: [UpdateDatasComponent],
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
  exports: [
    UpdateDatasComponent
  ]
})
export class UpdateDatasModule { }
