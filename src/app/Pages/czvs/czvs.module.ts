import { NgModule } from '@angular/core';
import {CZVSComponent} from './czvs.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageTitleModule} from '../../Layout/Components/page-title/page-title.module';
import {CZVSRoutingModule} from './czvs-routing.module';
import {LoadingModule} from '../../Loading/loading/loading.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from '../../app.module';
import {HttpClient} from '@angular/common/http';
import {TranslateContenuModule} from '../../Pipes/translateContenu/translate-contenu.module';




const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
        CZVSRoutingModule, PageTitleModule, LoadingModule, Ng2SearchPipeModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }), TranslateContenuModule
    ],
  declarations: [CZVSComponent],
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
export class CZVSModule { }
