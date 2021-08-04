import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageTitleModule} from '../../Layout/Components/page-title/page-title.module';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FicheProgrammerComponent} from './fiche-programmer.component';
import {FicheProgrammerRoutingModule} from './fiche-programmer-routing.module';
import {NomCardreDefaultModule} from '../../Pipes/nom-cardre-default.module';
import {FormatTypeInputModule} from './format-type-input.module';
import {LoadingModule} from '../../Loading/loading/loading.module';
import {TranslateModule} from '@ngx-translate/core';
import {TranslateContenuModule} from '../../Pipes/translateContenu/translate-contenu.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {FileUploadModule} from 'ng2-file-upload';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule, NgbModule, PerfectScrollbarModule, FormsModule, ReactiveFormsModule,
    FicheProgrammerRoutingModule, NomCardreDefaultModule, FormatTypeInputModule, PageTitleModule,
    LoadingModule, TranslateModule, TranslateContenuModule, MatFormFieldModule, MatSelectModule, HttpClientModule, MatIconModule, FileUploadModule, MatButtonModule, MatCardModule, MatCheckboxModule
  ],
    declarations: [FicheProgrammerComponent],
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
      FicheProgrammerComponent
    ]
})
export class FicheProgrammerModule { }
