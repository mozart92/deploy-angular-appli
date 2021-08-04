import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NotificationsOperationRoutingModule} from './notifications-operation-routing.module';
import {NotificationsOperationComponent} from './notifications-operation.component';
import {NgxLoadingModule} from 'ngx-loading';



@NgModule({
  imports: [
    CommonModule, PerfectScrollbarModule,
    NotificationsOperationRoutingModule, NgxLoadingModule
  ],
  declarations: [NotificationsOperationComponent],
  exports : [NotificationsOperationComponent]
})
export class NotificationsOperationModule { }
