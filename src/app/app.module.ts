import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, ArchitectUIState } from './ThemeOptions/store';
import { ConfigActions } from './ThemeOptions/store/config.actions';
import { AppRoutingModule } from './app-routing.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';

import {DataTablesModule} from 'angular-datatables';

// BOOTSTRAP COMPONENTS

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LaddaModule } from 'angular2-ladda';
import { NgxLoadingModule } from 'ngx-loading';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
// import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CountUpModule } from 'countup.js-angular2';
import { AgmCoreModule } from '@agm/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NouisliderModule } from 'ng2-nouislider';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TextMaskModule } from 'angular2-text-mask';
import { ClipboardModule } from 'ngx-clipboard';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
///import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ChartsModule } from 'ng2-charts';

// ANGULAR MATERIAL COMPONENTS

import { MatCheckboxModule } from '@angular/material/checkbox';

// LAYOUT

import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { AppsLayoutComponent } from './Layout/apps-layout/apps-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';
import { ThemeOptions } from './theme-options';
import { OptionsDrawerComponent } from './ThemeOptions/options-drawer/options-drawer.component';


// HEADER

import { HeaderComponent } from './Layout/Components/header/header.component';
import { DotsComponent } from './Layout/Components/header/elements/dots/dots.component';
import { SearchBoxComponent } from './Layout/Components/header/elements/search-box/search-box.component';
import { MegamenuComponent } from './Layout/Components/header/elements/mega-menu/mega-menu.component';
import { MegapopoverComponent } from './Layout/Components/header/elements/mega-menu/elements/megapopover/megapopover.component';
import { UserBoxComponent } from './Layout/Components/header/elements/user-box/user-box.component';
import { DrawerComponent } from './Layout/Components/header/elements/drawer/drawer.component';

// SIDEBAR

import { SidebarComponent } from './Layout/Components/sidebar/sidebar.component';
import { LogoComponent } from './Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER

import { FooterComponent } from './Layout/Components/footer/footer.component';
import { FooterDotsComponent } from './Layout/Components/footer/elements/footer-dots/footer-dots.component';
import { FooterMenuComponent } from './Layout/Components/footer/elements/footer-menu/footer-menu.component';

// Pages

import { ForgotPasswordComponent } from './Pages/UserPages/forgot-password/forgot-password.component';
import { ForgotPasswordBoxedComponent } from './Pages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import { LoginBoxedComponent } from './Pages/UserPages/login-boxed/login-boxed.component';
import { LoginComponent } from './Pages/UserPages/login/login.component';
import { RegisterBoxedComponent } from './Pages/UserPages/register-boxed/register-boxed.component';
import { RegisterComponent } from './Pages/UserPages/register/register.component';

// Components

import { NgbdSortableHeaderDirective } from './DemoPages/Tables/dynamic/demo/sortable.directive';

// Apex Charts
import { NgApexchartsModule } from 'ng-apexcharts';
// Gauges Charts

import { GaugeModule } from 'angular-gauge';
import { TrendModule } from 'ngx-trend';

import { LoginPageComponent } from './Pages/UserPages/login-page/login-page.component';
import {InterceptorClassProvider} from './Services/IntercepteurClass';
import { ListBaseQuestionnaireComponent } from './Pages/BaseQuestionnaire/list-base-questionnaire/list-base-questionnaire.component';
import { ListFicheCollectesComponent } from './Pages/FichesCollectes/list-fiche-collectes/list-fiche-collectes.component';
//import {LoadingComponent} from './Loading/loading/loading.component';
import {LoadingModule} from './Loading/loading/loading.module';
import {ChatModule} from './DemoPages/Applications/chat/chat.module';
import {LoginGuard} from './Guards/loginGuard';
//import { UpdateDatasComponent } from './Pages/update-datas/update-datas.component';
import {ModeProductionService} from './PlatesFormes/mode-production.service';
import { LoginPageCahisComponent } from './Pages/UserPages/login-page-cahis/login-page-cahis.component';
import { LoginPageSyremComponent } from './Pages/UserPages/login-page-syrem/login-page-syrem.component';
  //import { NotificationsOperationComponent } from './ComposantsPerso/notifications-operation/notifications-operation.component';
import {NotificationsOperationModule} from './ComposantsPerso/notifications-operation/notifications-operation.module';
//import { ListBulletinsComponent } from './Pages/list-bulletins/list-bulletins.component';
import {PageTitleModule} from './Layout/Components/page-title/page-title.module';
import {TranslateContenuModule} from './Pipes/translateContenu/translate-contenu.module';
import { AllMyDatasComponent } from './Pages/Planifications/all-my-datas/all-my-datas.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {GstBaseQuestionnaires} from './Guards/gstBaseQuestionnaires';
import {BulletinsInformationsGuard} from './Guards/bulletins-Informations-Guard';
import {CzvsGuard} from './Guards/czvs-Guard';
import {ExportDatasEncourGuard} from './Guards/export-datas-encour-Guard';
import {ExportationDatasGuard} from './Guards/exportation-datas-Guard';
import {GstAnalyseLaboratoireGuard} from './Guards/gst-analyse-laboratoire-Guard';
import {GstEspecesGuard} from './Guards/gst-especes-Guard';
import {GstLaboratoiresGuard} from './Guards/gst-Laboratoires-Guard';
import {GstNaturePrelevementGuard} from './Guards/gst-nature-prelevement-Guard';
import {GstCommune} from './Guards/gstCommune';
import {GstDepartement} from './Guards/gstDepartement';
import {GstGroupes} from './Guards/gstGroupes';
import {GstPathologiesGuard} from './Guards/gstPathologies-Guard';
import {GstRegions} from './Guards/gstRegions';
import {GstUsers} from './Guards/gstUsers';
import {LogPlanningGuard} from './Guards/log-planning-Guard';
import {MesuresControleGuard} from './Guards/mesures-controle-Guard';
import {NewPlanificationGuard} from './Guards/new-planification-Guard';
import {NiveauValidationGuard} from './Guards/niveau-validation-Guard';
import {OieGuard} from './Guards/oie-Guard';
import {ProfilsUserGuard} from './Guards/profils-user-Guard';
import {ProgrammesArchivesGuard} from './Guards/programmes-archives-Guard';
import {SourceContaminationGuard} from './Guards/source-contamination-Guard';
import {SystemProductionGuard} from './Guards/system-production-Guard';
import {TypeProductionGuard} from './Guards/type-production-Guard';
import {TypeVaccinGuard} from './Guards/type-vaccin-Guard';
import {VillagesGuard} from './Guards/villages-Guard';
import {GstFicherCollecte} from './Guards/gstFicherCollecte';
import {GstMaladiesGuard} from './Guards/gst-maladies-Guard';
//import { DonneeDejaVailderComponent } from './Pages/Planifications/donnee-deja-vailder/donnee-deja-vailder.component';

// import ngx-translate and the http loader
/*import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';*/








// Angular Material

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [

    // LAYOUT

    AppComponent,
    BaseLayoutComponent,
    AppsLayoutComponent,
    PagesLayoutComponent,
    OptionsDrawerComponent,

    // HEADER

    HeaderComponent,
    DotsComponent,
    SearchBoxComponent,
    MegamenuComponent,
    MegapopoverComponent,
    UserBoxComponent,
    DrawerComponent,


    // SIDEBAR

    SidebarComponent,
    LogoComponent,

    // FOOTER

    FooterComponent,
    FooterDotsComponent,
    FooterMenuComponent,

    // // User Pages

    ForgotPasswordComponent,
    ForgotPasswordBoxedComponent,
    LoginBoxedComponent,
    LoginComponent,
    RegisterBoxedComponent,
    RegisterComponent,

    //RegionsComponent,

    // Tables
    NgbdSortableHeaderDirective,

    LoginPageComponent,

    ListBaseQuestionnaireComponent,

    ListFicheCollectesComponent,

    LoginPageCahisComponent,

    LoginPageSyremComponent
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
      ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgReduxModule,
        CommonModule,
        LoadingBarRouterModule,
        DataTablesModule,
        LoadingModule,

        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
          }
        }),

        // Angular Bootstrap Components

        PerfectScrollbarModule,
        NgbModule,
        FontAwesomeModule,
        LaddaModule,
        FormsModule,
        ReactiveFormsModule,
        NgBootstrapFormValidationModule.forRoot(),
        NgxLoadingModule.forRoot({}),
        RoundProgressModule,
        ToastrModule.forRoot(),
        SlickCarouselModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),

        CountUpModule,
        AgmCoreModule.forRoot({
            // please get your own API key here:
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
            apiKey: ''
        }),
        ImageCropperModule,
        NouisliderModule,
        NgSelectModule,
        SelectDropDownModule,
        NgMultiSelectDropDownModule.forRoot(),
        JwBootstrapSwitchNg2Module,
        AngularEditorModule,
        HttpClientModule,
        TextMaskModule,
        ClipboardModule,
        TextareaAutosizeModule,
        ColorPickerModule,
        DropzoneModule,

        // Charts
        ChartsModule,
        NgApexchartsModule,
        GaugeModule.forRoot(),
        TrendModule,

        // Angular Material Components

        MatCheckboxModule,
        ChatModule,
        NotificationsOperationModule,
        PageTitleModule,
        TranslateContenuModule
    ],
  providers: [
    {
      provide:
      PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
      DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    ConfigActions,
    ThemeOptions,
    InterceptorClassProvider,
    LoginGuard,
    ModeProductionService,
    GstBaseQuestionnaires,
    BulletinsInformationsGuard,
    CzvsGuard,
    ExportDatasEncourGuard,
    ExportationDatasGuard,
    GstAnalyseLaboratoireGuard,
    GstEspecesGuard,
    GstLaboratoiresGuard,
    GstNaturePrelevementGuard,
    GstCommune,
    GstDepartement,
    GstGroupes,
    GstPathologiesGuard,
    GstRegions,
    GstUsers,
    LogPlanningGuard,
    MesuresControleGuard,
    NewPlanificationGuard,
    NiveauValidationGuard,
    OieGuard,
    ProfilsUserGuard,
    ProgrammesArchivesGuard,
    SourceContaminationGuard,
    SystemProductionGuard,
    TypeProductionGuard,
    TypeVaccinGuard,
    VillagesGuard,
    GstFicherCollecte,
    GstMaladiesGuard
  ],
  exports: [


  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
    private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [this.devTool.isEnabled() ? this.devTool.enhancer() : f => f]
    );

  }
}


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



