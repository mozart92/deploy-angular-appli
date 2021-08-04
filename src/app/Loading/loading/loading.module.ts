import { NgModule } from '@angular/core';
import {LoadingComponent} from './loading.component';
import {LoadingRoutingModule} from './loading-routing.module';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    LoadingRoutingModule
  ],
  declarations: [LoadingComponent],
  exports : [LoadingComponent]
})
export class LoadingModule { }
