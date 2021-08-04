import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NiveauValidationComponent} from './niveau-validation.component';
import {NiveauValidationRoutingModule} from './niveau-validation-routing.module';
import {TranslateContenuModule} from '../../../Pipes/translateContenu/translate-contenu.module';
import {NewPlanificationModule} from '../new-planification/new-planification.module';
import {LoadingModule} from '../../../Loading/loading/loading.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from '../../../app.module';
import {HttpClient} from '@angular/common/http';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    NiveauValidationRoutingModule, PageTitleModule,
    TranslateContenuModule, NewPlanificationModule,
    LoadingModule, NgMultiSelectDropDownModule, Ng2SearchPipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [NiveauValidationComponent],
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
export class NiveauValidationModule { }
