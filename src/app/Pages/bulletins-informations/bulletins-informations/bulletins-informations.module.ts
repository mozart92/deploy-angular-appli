import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DataTablesModule} from 'angular-datatables';

import {BulletinsInformationsRoutingModule} from './bulletins-informations-routing.module';
import {BulletinsInformationsComponent} from './bulletins-informations.component';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';

//susioncharts
import * as FusionCharts from 'fusioncharts';

// Load Maps
import * as Maps from 'fusioncharts/fusioncharts.maps';

// Load WorldMap definition
import * as Cameroon from 'fusioncharts/maps/cameroon/fusioncharts.cameroon';

// Load FusionTheme theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import {FusionChartsModule} from 'angular-fusioncharts';
import {BarChartModule} from '../../../DemoPages/Charts/chartjs/examples/bar-chart/bar-chart.module';
import {DiagramComparatifModule} from '../../visualisationDesDonnees/diagram-comparatif/diagram-comparatif.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


// Add dependencies for FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Maps, Cameroon, FusionTheme)




const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
        BulletinsInformationsRoutingModule, PageTitleModule, DataTablesModule, FusionChartsModule, DiagramComparatifModule, FontAwesomeModule,
    ],
  declarations: [BulletinsInformationsComponent],
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
export class BulletinsInformationsModule { }
