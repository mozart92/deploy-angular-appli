import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegionsRoutingModule} from '../../Pages/Configuration/regions/regions-routing.module';
import {PageTitleModule} from '../../Layout/Components/page-title/page-title.module';
import {LoadingModule} from '../../Loading/loading/loading.module';
import {ArticlesRoutingModule} from './articles-routing.module';
import {ArticlesComponent} from './articles.component';
import {FormatTextTooLongModule} from '../../Pipes/formatTextTooLong/format-text-too-long.module';
import {ImageByDefaultModule} from '../../Pipes/image-by-default.module';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {TextareaAutosizeModule} from 'ngx-textarea-autosize';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
    imports: [
        CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
        ArticlesRoutingModule, PageTitleModule, LoadingModule, FormatTextTooLongModule, ImageByDefaultModule, AngularEditorModule, TextareaAutosizeModule
    ],
  declarations: [ArticlesComponent],
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
export class ArticlesModule { }
