import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {RegionsRoutingModule} from '../regions/regions-routing.module';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DepartementsComponent} from './departements.component';
import {DepartementsRoutingModule} from './departements-routing.module';
import {LoadingModule} from '../../../Loading/loading/loading.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.module';
import {HttpClient} from '@angular/common/http';
import {TranslateContenuModule} from '../../../Pipes/translateContenu/translate-contenu.module';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    DepartementsRoutingModule, PageTitleModule, LoadingModule, Ng2SearchPipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }), TranslateContenuModule
  ],
  declarations: [DepartementsComponent],
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
export class DepartementsModule { }
