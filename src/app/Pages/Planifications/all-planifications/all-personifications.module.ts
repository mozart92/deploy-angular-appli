import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AllPlanificationsRoutingModule} from './all-planifications-routing.module';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {AllPlanificationsComponent} from './all-planifications.component';
import {NewPlanificationModule} from '../new-planification/new-planification.module';
import {TranslateContenuModule} from '../../../Pipes/translateContenu/translate-contenu.module';
import {LoadingModule} from '../../../Loading/loading/loading.module';
import {TranslateModule} from '@ngx-translate/core';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
        AllPlanificationsRoutingModule, PageTitleModule, NewPlanificationModule, TranslateContenuModule, LoadingModule, TranslateModule
    ],
  declarations: [AllPlanificationsComponent],
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
export class AllPersonificationsModule { }
