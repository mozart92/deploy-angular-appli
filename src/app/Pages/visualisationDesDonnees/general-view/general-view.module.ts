import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GeneralViewComponent} from './general-view.component';
import {GeneralViewRoutingModule} from './general-view-routing.module';
import {FusionChartsModule} from 'angular-fusioncharts';



//susioncharts
import * as FusionCharts from 'fusioncharts';

// Load Maps
import * as Maps from 'fusioncharts/fusioncharts.maps';

// Load WorldMap definition
import * as Cameroon from 'fusioncharts/maps/cameroon/fusioncharts.cameroon';

// Load FusionTheme theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import {LoadingModule} from '../../../Loading/loading/loading.module';
import {TranslateContenuModule} from '../../../Pipes/translateContenu/translate-contenu.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {createTranslateLoader} from '../../../app.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// Add dependencies for FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Maps, Cameroon, FusionTheme)


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
        GeneralViewRoutingModule, PageTitleModule,
      FusionChartsModule, LoadingModule, TranslateContenuModule, MatCheckboxModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      })
    ],
  declarations: [GeneralViewComponent],
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
export class GeneralViewModule { }

function createTranslateLoaderPerso(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../assets/i18n/', '.json');
}
