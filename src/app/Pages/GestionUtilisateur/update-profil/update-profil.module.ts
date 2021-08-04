import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GstMaladiesRoutingModule} from '../../gst-maladies/gst-maladies-routing.module';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {GstMaladiesComponent} from '../../gst-maladies/gst-maladies.component';
import {UpdateProfilRoutingModule} from './update-profil-routing.module';
import {UpdateProfilComponent} from './update-profil.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    UpdateProfilRoutingModule, PageTitleModule
  ],
  declarations: [UpdateProfilComponent],
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
export class UpdateProfilModule { }
