import { Component, OnInit } from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import {GeneralService} from '../../../../../Services/general/general.service';
import {ModeProductionService} from '../../../../../PlatesFormes/mode-production.service';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
})
export class MegamenuComponent implements OnInit {
  public value = false;


  currentLangue = localStorage.getItem("langue");

  programmationFR = "Programmation";
  programmationEN = "Programming";

  nouvelleBaseNotificationFR = "Nouvelle base de notification";
  nouvelleBaseNotificationEN = "New notification database";

  gestionQuestionnairesFR = "Gestion des questionnaires";
  gestionQuestionnairesEN = "Questionnaire management";

  nouvelleFicheNotificationFR = "Nouvelle fiche de notification";
  nouvelleFicheNotificationEN = "New notification form";

  gestionSectionsQuestionnaireFR = "Gestion des sections du questionnaire";
  gestionSectionsQuestionnaireEN = "Management of the questionnaire sections";

  programmationBaseNotificationFR = "Programmation d'une base de notifications";
  programmationBaseNotificationEN = "Programming a notification database";

  planificationCollecteFR = "Planification d'une collecte";
  planificationCollecteEN = "Planning a collection";

  listeToutesProgrammationsFR = "Liste de toutes les programmations";
  listeToutesProgrammationsEN = "List of all programmes";

  listePlanificationsCoursFR = "Liste des planifications en cours";
  listePlanificationsCoursEN = "List of current planning";

  insertionNiveauxvalidationFR = "Insertion des niveaux de validation";
  insertionNiveauxvalidationEN = "Insertion of validation levels";

  diffuserBulletinInformationFR = "Diffuser un bulletin d'information";
  diffuserBulletinInformationEN = "Disseminate a newsletter";

  configurationFR = "Configurations";
  configurationEN = "Settings";

  regionsFR = "Regions";
  regionsEN = "Regions";

  departementsFR = "Départements";
  departementsEN = "Divisions";

  arrondissementsFR = "Arrondissements";
  arrondissementsEN = "Districts";

  communesFR = "Communes";
  communesEN = "Municipalities";

  villagesFR = "Villages";
  villagesEN = "Villages";

  especesFR = "Espèces";
  especesEN = "Species";

  abatoireFR = "Laboratoires";
  abatoireEN = "The abattoir";

  pathologiesFR = "Pathologies";
  pathologiesEN = "Pathology";

  naturePrelevementFR = "Nature prélèvement";
  naturePrelevementEN = "Type of levy";

  typeAnalyseLaboratoireFR = "Type d'analyse laboratoire";
  typeAnalyseLaboratoireEN = "Type of laboratory analysis";

  listeMaladiesFR = "Liste des Maladies";
  listeMaladiesEN = "List of Diseases";

  paysOIEFR = "Pays de l'OIE";
  paysOIEEN = "OIE countries";

  sourceContaminationFR = "Source de contamination";
  sourceContaminationEN = "Source of contamination";

  mesuresControleFR = "Mesures de contrôle";
  mesuresControleEN = "Control measures";

  typeVaccinsFR = "Type de vaccins";
  typeVaccinsEN = "Type of vaccines";

  typeProductionFR = "Type de production";
  typeProductionEN = "Type of production";

  systemeProductionFR = "Système de production";
  systemeProductionEN = "Production system";

  groupesUtilisateursFR= "Groupes utilisateurs";
  groupesUtilisateursEN= "User groups";

  utilisateursFR = "Utilisateurs";
  utilisateursEN = "Users";

  profilsUtilisateursFR = "Profils utilisateurs";
  profilsUtilisateursEN = "User profiles";

  gestionContenuFR = "Gestion du contenu";
  gestionContenuEN = "Content management";

  gestionSiteWebFR = "Gestion du Site Web";
  gestionSiteWebEN = "Website Management";

  gestionCategoriesFR = "Gestion des catégories";
  gestionCategoriesEN = "Category management";

  gestionMenusFR = "Gestion des menus";
  gestionMenusEN = "Menu management";

  gestionArticlesFR = "Gestion des articles";
  gestionArticlesEN = "Article management";

  gestionMediasFR = "Gestion des médias";
  gestionMediasEN = "Media management";

  gestionFAQfr = "Gestion des FAQ";
  gestionFAQen = "FAQ management";

  constructor(public globals: ThemeOptions,
              public servicegeneral: GeneralService,
              public modeApply : ModeProductionService) { }

  ngOnInit() {
  }

  hideMegamenu() {
    this.value = !this.value;
  }
}
