import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageTitleModule} from '../../../Layout/Components/page-title/page-title.module';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NewPlanificationComponent} from './new-planification.component';
import {NewPlanificationRoutingModule} from './new-planification-routing.module';
import {TranslateContenuModule} from '../../../Pipes/translateContenu/translate-contenu.module';
import {TextareaAutosizeModule} from 'ngx-textarea-autosize';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {NotificationsOperationModule} from '../../../ComposantsPerso/notifications-operation/notifications-operation.module';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    NewPlanificationRoutingModule, PageTitleModule,
    TranslateContenuModule, TextareaAutosizeModule, NgMultiSelectDropDownModule,
    NotificationsOperationModule
  ],
    declarations: [NewPlanificationComponent],
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
        NewPlanificationComponent
    ]
})
export class NewPlanificationModule { }
