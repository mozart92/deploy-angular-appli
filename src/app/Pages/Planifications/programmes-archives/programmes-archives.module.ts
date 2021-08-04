import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {TranslateContenuModule} from '../../../Pipes/translateContenu/translate-contenu.module';
import {ProgrammesArchivesRoutingModule} from './programmes-archives-routing.module';
import {ProgrammesArchivesComponent} from './programmes-archives.component';


//susioncharts
import * as FusionCharts from 'fusioncharts';

// Load Maps
import * as Maps from 'fusioncharts/fusioncharts.maps';

// Load WorldMap definition
import * as Cameroon from 'fusioncharts/maps/cameroon/fusioncharts.cameroon';

// Load FusionTheme theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import {FusionChartsModule} from 'angular-fusioncharts';
import {LoadingModule} from '../../../Loading/loading/loading.module';

// Add dependencies for FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Maps, Cameroon, FusionTheme)



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    ProgrammesArchivesRoutingModule, TranslateContenuModule, PageTitleModule,FusionChartsModule, LoadingModule
  ],
  declarations: [ProgrammesArchivesComponent],
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
export class ProgrammesArchivesModule { }
