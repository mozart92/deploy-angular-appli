import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {UploadFilesRoutingModule} from './upload-files-routing.module';
import {UploadFilesComponent} from './upload-files.component';
import {UpdateDatasComponent} from '../../Pages/update-datas/update-datas.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule, PerfectScrollbarModule, UploadFilesRoutingModule,
  ],
  declarations: [UploadFilesComponent],
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
  exports: [
    UploadFilesComponent
]
})
export class UploadFilesModule { }
