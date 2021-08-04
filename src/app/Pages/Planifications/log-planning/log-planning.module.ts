import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AllPlanificationsRoutingModule} from '../all-planifications/all-planifications-routing.module';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {NewPlanificationModule} from '../new-planification/new-planification.module';
import {TranslateContenuModule} from '../../../Pipes/translateContenu/translate-contenu.module';
import {AllPlanificationsComponent} from '../all-planifications/all-planifications.component';
import {LogPlanningRoutingModule} from './log-planning-routing.module';
import {LogPlanningComponent} from './log-planning.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    LogPlanningRoutingModule, TranslateContenuModule, PageTitleModule
  ],
  declarations: [LogPlanningComponent],
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
export class LogPlanningModule { }
