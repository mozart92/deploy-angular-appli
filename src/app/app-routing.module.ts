import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';
import {LoginPageComponent} from './Pages/UserPages/login-page/login-page.component';
import {LoginGuard} from './Guards/loginGuard';
import {GstBaseQuestionnaires} from './Guards/gstBaseQuestionnaires';
import {GstRegions} from './Guards/gstRegions';
import {GstDepartement} from './Guards/gstDepartement';
import {GstCommune} from './Guards/gstCommune';
import {GstGroupes} from './Guards/gstGroupes';
import {GstUsers} from './Guards/gstUsers';
import {ProfilsUserGuard} from './Guards/profils-user-Guard';
import {GstFicherCollecte} from './Guards/gstFicherCollecte';
import {NewPlanificationGuard} from './Guards/new-planification-Guard';
import {NiveauValidationGuard} from './Guards/niveau-validation-Guard';
import {ExportationDatasGuard} from './Guards/exportation-datas-Guard';
import {CzvsGuard} from './Guards/czvs-Guard';
import {VillagesGuard} from './Guards/villages-Guard';
import {GstLaboratoiresGuard} from './Guards/gst-Laboratoires-Guard';
import {GstEspecesGuard} from './Guards/gst-especes-Guard';
import {GstPathologiesGuard} from './Guards/gstPathologies-Guard';
import {GstNaturePrelevementGuard} from './Guards/gst-nature-prelevement-Guard';
import {GstAnalyseLaboratoireGuard} from './Guards/gst-analyse-laboratoire-Guard';
import {GstMaladiesGuard} from './Guards/gst-maladies-Guard';
import {OieGuard} from './Guards/oie-Guard';
import {SourceContaminationGuard} from './Guards/source-contamination-Guard';
import {MesuresControleGuard} from './Guards/mesures-controle-Guard';
import {TypeVaccinGuard} from './Guards/type-vaccin-Guard';
import {TypeProductionGuard} from './Guards/type-production-Guard';
import {SystemProductionGuard} from './Guards/system-production-Guard';
import {LogPlanningGuard} from './Guards/log-planning-Guard';
import {ProgrammesArchivesGuard} from './Guards/programmes-archives-Guard';
import {ExportDatasEncourGuard} from './Guards/export-datas-encour-Guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/authentification',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'apps',
        loadChildren: () => import('./DemoPages/Applications/Applications.module').then(m => m.ApplicationModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'charts',
        loadChildren: () => import('./DemoPages/Charts/Charts.module').then(m => m.ChartModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'components',
        loadChildren: () => import('./DemoPages/Components/Components.module').then(m => m.ComponentsDrawerModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'dashboards',
        loadChildren: () => import('./DemoPages/Dashboards/Dashboards.module').then(m => m.DashboardsModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'elements',
        loadChildren: () => import('./DemoPages/Elements/Elements.module').then(m => m.ElementsModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'form-elements',
        loadChildren: () => import('./DemoPages/Forms/Elements/form-elements.module').then(m => m.FormElementModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'form-widgets',
        loadChildren: () => import('./DemoPages/Forms/Widgets/forms-widgets.module').then(m => m.FormWidgetsModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'button-indicators',
        loadChildren: () => import('./DemoPages/Material/ButtonsIndicators/buttonsIndicators.module').then(m => m.MateriaButoonIndicatorslModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'layout',
        loadChildren: () => import('./DemoPages/Material/Layout/layout.module').then(m => m.MaterialLayoutModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'form-controls',
        loadChildren: () => import('./DemoPages/Material/FormControls/formcontrols.module').then(m => m.MaterialFormControlModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'material',
        loadChildren: () => import('./DemoPages/Material/Material.module').then(m => m.MaterialModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'widgets',
        loadChildren: () => import('./DemoPages/Widgets/Widgets.module').then(m => m.WidgetsModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'tables/bootstrap',
        loadChildren: () => import('./DemoPages/Tables/tables-main/tables-main.module').then(m => m.TablesMainModule),
        canActivate : [LoginGuard]
      },







      {
        path: 'pages/regions',
        loadChildren: () => import('./Pages/Configuration/regions/regions.module').then(m => m.RegionsModule),
        canActivate : [LoginGuard, GstRegions]
      },
      {
        path: 'pages/departements',
        loadChildren: () => import('./Pages/Configuration/departements/departements.module').then(m => m.DepartementsModule),
        canActivate : [LoginGuard, GstDepartement]
      },
      {
        path: 'pages/communes',
        loadChildren: () => import('./Pages/Configuration/communes/communes.module').then(m => m.CommunesModule),
        canActivate : [LoginGuard, GstCommune]
      },
      {
        path: 'pages/groupe-user',
        loadChildren: () => import('./Pages/GestionUtilisateur/groupe-user/groupe-user.module').then(m => m.GroupeUserModule),
        canActivate : [LoginGuard, GstGroupes]
      },
      {
        path: 'pages/new-user',
        loadChildren: () => import('./Pages/GestionUtilisateur/new-user/new-user.module').then(m => m.NewUserModule),
        canActivate : [LoginGuard, GstUsers]
      },
      {
        path: 'pages/profils-user',
        loadChildren: () => import('./Pages/GestionUtilisateur/profils-user/profils-user.module').then(m => m.ProfilsUserModule),
        canActivate : [LoginGuard, ProfilsUserGuard]
      },
      {
        path: 'pages/nouveau-questionnaire',
        loadChildren: () => import('./Pages/BaseQuestionnaire/nouveau-questionnaire/nouveau-questionnaire.module').then(m => m.NouveauQuestionnaireModule),
        canActivate : [LoginGuard, GstBaseQuestionnaires]
      },
      {
        path: 'pages/nouvelle-fiche',
        loadChildren: () => import('./Pages/FichesCollectes/nouvelle-fiche/nouvelle-fiche.module').then(m => m.NouvelleFicheModule),
        canActivate : [LoginGuard, GstFicherCollecte]
      },
      {
        path: 'pages/all-planifications',
        loadChildren: () => import('./Pages/Planifications/all-planifications/all-personifications.module').then(m => m.AllPersonificationsModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'pages/new-planification',
        loadChildren: () => import('./Pages/Planifications/new-planification/new-planification.module').then(m => m.NewPlanificationModule),
        canActivate : [LoginGuard, NewPlanificationGuard]
      },
      {
        path: 'pages/niveau-validation',
        loadChildren: () => import('./Pages/Planifications/niveau-validation/niveau-validation.module').then(m => m.NiveauValidationModule),
        canActivate : [LoginGuard, NiveauValidationGuard]
      },
      {
        path: 'pages/data-envoyer',
        loadChildren: () => import('./Pages/Planifications/data-envoyer/data-envoyer.module').then(m => m.DataEnvoyerModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'pages/data-receive',
        loadChildren: () => import('./Pages/Planifications/data-receive/data-receive.module').then(m => m.DataReceiveModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'donnees-deja-validees',
        loadChildren: () => import('./Pages/Planifications/donnee-deja-vailder/donnee-deja-vailder.module').then(m => m.DonneeDejaVailderModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'toutes-mes-donnees',
        loadChildren: () => import('./Pages/Planifications/all-my-datas/all-my-datas.module').then(m => m.AllMyDatasModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'ficheQuestionnaire/:nomFichier/:idFichier',
        loadChildren: () => import('./Pages/fiche-programmer/fiche-programmer.module').then(m => m.FicheProgrammerModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'pages/diagram-comparatif',
        loadChildren: () => import('./Pages/visualisationDesDonnees/diagram-comparatif/diagram-comparatif.module').then(m => m.DiagramComparatifModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'pages/exportation-datas',
        loadChildren: () => import('./Pages/visualisationDesDonnees/exportation-datas/exportation-datas.module').then(m => m.ExportationDatasModule),
        canActivate : [LoginGuard, ExportationDatasGuard]
      },
      {
        path: 'programme/acherve/bulletins-informations/:idPlanning',
        loadChildren: () => import('./Pages/bulletins-informations/bulletins-informations/bulletins-informations.module').then(m => m.BulletinsInformationsModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'pages/general-view',
        loadChildren: () => import('./Pages/visualisationDesDonnees/general-view/general-view.module').then(m => m.GeneralViewModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'pages/histogram-collecte',
        loadChildren: () => import('./Pages/visualisationDesDonnees/histogram-collecte/histogram-collecte.module').then(m => m.HistogramCollecteModule),
        canActivate : [LoginGuard]
      }
      ,
      {
        path: 'liste-des-fichiers/:nameBDquestion/:idBDquestion',
        loadChildren: () => import('./Pages/BaseQuestionnaire/list-fichiers/list-fichiers.module').then(m => m.ListFichiersModule),
        canActivate : [LoginGuard]
      }
      ,
      {
        path: 'gestion/czvs',
        loadChildren: () => import('./Pages/czvs/czvs.module').then(m => m.CZVSModule),
        canActivate : [LoginGuard, CzvsGuard]
      }
      ,
      {
        path: 'gestion/villages',
        loadChildren: () => import('./Pages/villages/villages.module').then(m => m.VillagesModule),
        canActivate : [LoginGuard, VillagesGuard]
      }
      ,
      {
        path: 'gestion/laboratoires',
        loadChildren: () => import('./Pages/gst-laboratoires/gst-laboratoires.module').then(m => m.GstLaboratoiresModule),
        canActivate : [LoginGuard, GstLaboratoiresGuard]
      }
      ,
      {
        path: 'gestion/especes',
        loadChildren: () => import('./Pages/gst-especes/gst-especes.module').then(m => m.GstEspecesModule),
        canActivate : [LoginGuard, GstEspecesGuard]
      }
      ,
      {
        path: 'gestion/pathologies',
        loadChildren: () => import('./Pages/gst-pathologies/gst-pathologies.module').then(m => m.GstPathologiesModule),
        canActivate : [LoginGuard, GstPathologiesGuard]
      }
      ,
      {
        path: 'gestion/nature-prelevement',
        loadChildren: () => import('./Pages/gst-nature-prelevement/gst-nature-prelevement.module').then(m => m.GstNaturePrelevementModule),
        canActivate : [LoginGuard, GstNaturePrelevementGuard]
      }
      ,
      {
        path: 'gestion/analyse-laboratoire',
        loadChildren: () => import('./Pages/gst-analyse-laboratoire/gst-analyse-laboratoire.module').then(m => m.GstAnalyseLaboratoireModule),
        canActivate : [LoginGuard, GstAnalyseLaboratoireGuard]
      }
      ,
      {
        path: 'gestion/maladies',
        loadChildren: () => import('./Pages/gst-maladies/gst-maladies.module').then(m => m.GstMaladiesModule),
        canActivate : [LoginGuard, GstMaladiesGuard]
      }
      ,
      {
        path: 'gestion/OIE',
        loadChildren: () => import('./Pages/oie/oie.module').then(m => m.OIEModule),
        canActivate : [LoginGuard, OieGuard]
      }
      ,
      {
        path: 'gestion/sources-contamination',
        loadChildren: () => import('./Pages/source-contamination/source-contamination.module').then(m => m.SourceContaminationModule),
        canActivate : [LoginGuard, SourceContaminationGuard]
      }
      ,
      {
        path: 'gestion/mesures-controles',
        loadChildren: () => import('./Pages/mesures-controle/mesures-controle.module').then(m => m.MesuresControleModule),
        canActivate : [LoginGuard, MesuresControleGuard]
      }
      ,
      {
        path: 'gestion/types-vaccin',
        loadChildren: () => import('./Pages/type-vaccin/type-vaccin.module').then(m => m.TypeVaccinModule),
        canActivate : [LoginGuard, TypeVaccinGuard]
      }
      ,
      {
        path: 'gestion/types-production',
        loadChildren: () => import('./Pages/type-production/type-production.module').then(m => m.TypeProductionModule),
        canActivate : [LoginGuard, TypeProductionGuard]
      }
      ,
      {
        path: 'gestion/systeme-production',
        loadChildren: () => import('./Pages/system-production/system-production.module').then(m => m.SystemProductionModule),
        canActivate : [LoginGuard, SystemProductionGuard]
      }
      ,
      {
        path: 'programme/acherve',
        loadChildren: () => import('./Pages/Planifications/programmes-archives/programmes-archives.module').then(m => m.ProgrammesArchivesModule),
        canActivate : [LoginGuard, ProgrammesArchivesGuard]
      }
      ,
      {
        path: 'programme/alert',
        loadChildren: () => import('./Pages/Planifications/log-planning/log-planning.module').then(m => m.LogPlanningModule),
        canActivate : [LoginGuard, LogPlanningGuard]
      }
      ,
      {
        path: 'export/donnees/encour',
        loadChildren: () => import('./Pages/export-datas-encour/export-datas-encour.module').then(m => m.ExportDatasEncourModule),
        canActivate : [LoginGuard, ExportDatasEncourGuard]
      }
      ,
      {
        path: 'update/profil/utilisateur',
        loadChildren: () => import('./Pages/GestionUtilisateur/update-profil/update-profil.module').then(m => m.UpdateProfilModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'list-bulletins',
        loadChildren: () => import('./Pages/list-bulletins/list-bulletins.module').then(m => m.ListBulletinsModule),
        canActivate : [LoginGuard]
      },
      //HESTION DU SITE WEB

      {
        path: 'GestionContenu/faq',
        loadChildren: () => import('./GestionContenuSiteWeb/faq/faq.module').then(m => m.FaqModule),
        canActivate : [LoginGuard]
      },

      {
        path: 'GestionContenu/categories',
        loadChildren: () => import('./GestionContenuSiteWeb/categories/categories.module').then(m => m.CategoriesModule),
        canActivate : [LoginGuard]
      },

      {
        path: 'GestionContenu/menus',
        loadChildren: () => import('./GestionContenuSiteWeb/menus/menus.module').then(m => m.MenusModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'GestionContenu/articles',
        loadChildren: () => import('./GestionContenuSiteWeb/articles/articles.module').then(m => m.ArticlesModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'GestionContenu/multimedia',
        loadChildren: () => import('./GestionContenuSiteWeb/multimedia/multimedia.module').then(m => m.MultimediaModule),
        canActivate : [LoginGuard]
      },

      //ROUTAGE DES PAGES DU SUPPORT TECHNIQUE

      {
        path: 'support/guide/utilisateur',
        loadChildren: () => import('./Pages/supportTechnique/guide-utilisateur/guide-utilisateur.module').then(m => m.GuideUtilisateurModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'support/guide/administration',
        loadChildren: () => import('./Pages/supportTechnique/gui-administration/gui-administration.module').then(m => m.GuiAdministrationModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'support/faq',
        loadChildren: () => import('./Pages/supportTechnique/faqdsupport/faqdsupport.module').then(m => m.FaqdsupportModule),
        canActivate : [LoginGuard]
      },
      {
        path: 'support/contact',
        loadChildren: () => import('./Pages/supportTechnique/contact-us/contact-us.module').then(m => m.ContactUsModule),
        canActivate : [LoginGuard]
      }

    ]
  },

  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      // User Pages
      {
        path: 'pages/authentification', component: LoginPageComponent, data: { extraParameter: '' }
      },

 /*     {
        path: 'pages/login', component: LoginComponent, data: { extraParameter: '' }
      },
      {
        path: 'pages/login-boxed', component: LoginBoxedComponent, data: { extraParameter: '' }
      },
      {
        path: 'pages/register', component: RegisterComponent, data: { extraParameter: '' }
      },
      {
        path: 'pages/register-boxed', component: RegisterBoxedComponent, data: { extraParameter: '' }
      },
      {
        path: 'pages/forgot-password', component: ForgotPasswordComponent, data: { extraParameter: '' }
      },
      {
        path: 'pages/forgot-password-boxed', component: ForgotPasswordBoxedComponent, data: { extraParameter: '' }
      },*/

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
