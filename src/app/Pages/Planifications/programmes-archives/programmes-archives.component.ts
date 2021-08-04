import {Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {NewPlanification} from '../../../Model/NewPlanification';
import {BaseQuestionnaireM} from '../../../Model/BaseQuestionnaireM';
import {BaseQuestionnaireService} from '../../../Services/baseQuestionnaire.service';
import {NewPlannificationService} from '../../../Services/newPlannification/new-plannification.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Utilisateurs} from '../../../Model/utilisateurs';
import {AnwserQuestionsService} from '../../../Services/anwserQuestions/anwser-questions.service';
import {AnwserQuestions} from '../../../Model/anwserQuestions';
import {RegionM} from '../../../Model/RegionM';
import {RegionService} from '../../../Services/Region/region.service';
import {NiveauValidationM} from '../../../Model/NiveauValidationM';
import {ModeProductionService} from '../../../PlatesFormes/mode-production.service';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {translateContenufunction} from '../../../ServiceAPI/GeneralAPI';

@Component({
  selector: 'app-programmes-archives',
  templateUrl: './programmes-archives.component.html',
  styleUrls: ['./programmes-archives.component.sass'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }

    .dark-modal .close {
      color: white;
    }

    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class ProgrammesArchivesComponent implements OnInit, OnDestroy {


  icon = 'pe-7s-timer icon-gradient bg-premium-dark';
  currentLangue = localStorage.getItem('langue');
  currentUser = localStorage.getItem('token');

  headingFR = 'Planifications archivées';
  headingEN = 'Planifications archivées';

  subheadingFR = 'Consulter, Visualiser les statistiques de promptitude d\'envoi des données des planifications archivées';
  subheadingEN = 'Consulter, Visualiser les statistiques de promptitude d\'envoi des données des planifications archivées';

  detailFR = 'Détail';
  detailEN = 'Detail';

  datestartFR = 'Date début';
  datestartEN = 'Start date';

  dateEndFR = 'Date fin';
  dateEndEN = 'End date';

  dateEffectifFR = 'Date effectif';
  dateEffectifEN = 'Effective date';

  frequenceFR = 'Fréquence';
  frequenceEN = 'Frequency';

  typeClotureFR = 'Type clôture';
  typeClotureEN = 'Fence type';

  observationsFR = 'Observations';
  observationsEN = 'Observations';

  objectifsFR = 'Objectifs';
  objectifsEN = 'Specific objectives';

  closeFR = 'Fermer';
  closeEN = 'Close';

  baseQuestionnairesPlanificationFR = "Les base questionnaires de la planification";
  baseQuestionnairesPlanificationEN = "Les base questionnaires de la planification";


  niveauxValidationPlanificationFR = "Niveaux de validation de cette planification";
  niveauxValidationPlanificationEN = "Niveaux de validation de cette planification";

  niveauFR = "Niveau";
  niveauEN = "Niveau";

  evaluationRegionnalePromptitudeFR = "Evaluation régionnale de la promptitude d'envoi de données";
  evaluationRegionnalePromptitudeEN = "Evaluation régionnale de la promptitude d'envoi de données";

  regionFR = "Région";
  regionEN = "Région";

  promptitudeFR = "Promptitude";
  promptitudeEN = "Promptitude";

  transmisTempsFR = "Transmis à temps";
  transmisTempsEN = "Transmis à temps";

  transmisRetardFR = "Transmis en retard";
  transmisRetardEN = "Transmis en retard";

  nonTransmisFR = "Non transmis";
  nonTransmisEN = "Non transmis";

  bulletinInformationsFR = "Bulletin d'informations";
  bulletinInformationsEN = "Bulletin d'informations";

  duFR = "du";
  duEN = "as from";

  auFR = "au";
  auEN = "to";

  aucunePlanificationAcherveeFR = "Aucune planification achervée";
  aucunePlanificationAcherveeEN = "Aucune planification achervée";

  listPlannification: NewPlanification[] = [];
  onPlanningForRead: NewPlanification;

  @ViewChild('objBD') objBD;
  @ViewChild('objTitle') objTitle;
  dataToSend = null;
  isvisible: boolean = true;
  show = false;
  thrust = true;

  listBasequestionnaire: BaseQuestionnaireM[] = [];
  listAllDataValide: AnwserQuestions[] = [];
  dataFinalesFOrStat: AnwserQuestions[] = [];
  listregions: RegionM[] = [];
  listGroupByPlanning: NiveauValidationM[] = [];

  dataSource: any = {'chart': {}, 'colorrange': {}, 'data': []};

  dataAsByFusioncharts: Array<any> = [];

  chart = {
    'caption': 'Vue global sur tout le térritoire nationnal:',
    'numbersuffix': '',
    'includevalueinlabels': '1',
    'labelsepchar': ': ',
    'entityFillHoverColor': '#FFF9C4',
    'theme': 'fusion'
  };

  colorrange = {
    'minvalue': '0',
    'code': '#d92550',
    'color': []
  };

  constructor(private serBDQuestionnaire: BaseQuestionnaireService,
              private servicePlanning: NewPlannificationService,
              private modalService: NgbModal,
              private serviceDataValide: AnwserQuestionsService,
              private serviceregion: RegionService,
              public modeApply : ModeProductionService,
              private serviceNotification : NotificationsGeneralService) {
  }

  ngOnInit() {
    this.serviceNotification.configShowNotif.showLoading.text = translateContenufunction("Chargement en cours", "Chargement en cours");
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.servicePlanning.getAllPlanningArchiveUser().subscribe(
      (response) => {
        this.initPlanning(response);

      },
      (error) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        console.log(error)
      }
    );

    this.chargeBaseQuestionnaire();
    this.chargeAllDataValide();
    this.chargeRegion();
    this.thrust = false;
  }

  ngOnDestroy(): void {}

  chargeRegion() {
    this.serviceregion.getRegions().subscribe(
      (reponse) => {
        const tailleArray = (<RegionM[]>reponse).length;
        let regionInit: RegionM = new RegionM();
        for (let i = 0; i < tailleArray; i++) {
          regionInit = new RegionM(
            reponse[i].id,
            reponse[i].codeRegion,
            reponse[i].libelleRegionFR,
            reponse[i].libelleRegionEN,
            []
          );
          this.listregions.push(regionInit);
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }

  chargeAllDataValide() {
    this.serviceDataValide.getAnwserQuestion().subscribe(
      (response) => {
        this.listAllDataValide = (response as AnwserQuestions[]);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onShowDetail(itemPlanning, content) {
    this.onPlanningForRead = itemPlanning;
    this.initDonneevalid(itemPlanning);
    this.openXl(content);
  }


  initDonneevalid(planning: NewPlanification) {

    if (this.listAllDataValide.length > 0) {

      this.dataFinalesFOrStat = [];

      for (let data of this.listAllDataValide) {

        let databrut = JSON.parse((<string>data.reponseJson));
        let databrutJSON: String[] = Object.keys(databrut);
        let y = 0;
        let z = 0;
        for (let i = 0; i < databrutJSON.length; i++) {
          if (databrutJSON[i] == 'Region') {
            y++;
          }
        }
        if (y > 0) {
          this.dataFinalesFOrStat.push(data);
        }
      }
      this.dataAsByFusioncharts = [];
      for (let itemregion of this.listregions) {
        itemregion.donnee = [];
        let itemReady = {'id': '', 'value': '', 'showLabel': ''};
        let ColorMaps = '#d92550';
        let getData: AnwserQuestions[] = [];
        for (let itemdatafinal of this.dataFinalesFOrStat) {
          if ((itemdatafinal.programmation as number) == planning.idOrigin) {
            let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
            if (itemregion.libelleRegionFR == itemdataJSON.Region) {
              getData.push(itemdatafinal);
            }
          }
        }
        if (getData.length >= 1) {
          itemregion.donnee.push({
            'label': 'bg-success',
            'taux': 0
          });
          for (let itemdatafinal of getData) {
            itemregion.donnee[0].taux += 1;
            ColorMaps = '#3ac47d';
            if (planning.dateFinInitiale != null) {
              let restreintDateData: string = itemdatafinal.create_le.toString().split('T')[0];
              let timeFromData = new Date(restreintDateData).getTime();
              let timePlanning = new Date(planning.dateFinInitiale.toString()).getTime();
              if (timePlanning >= timeFromData) {
                itemregion.donnee[0].label = 'bg-warning';
                ColorMaps = '#f7b924';
              }
            }
          }
        } else {
          itemregion.donnee.push({'label': 'bg-danger', 'taux': 0});
        }
        itemReady.id = itemregion.codeRegion;
        itemReady.value = (itemregion.donnee[0].taux as string)
        itemReady.showLabel = '1';
        this.dataAsByFusioncharts.push(itemReady);
        this.colorrange.color.push(
        {
          'minvalue': (itemregion.donnee[0].taux as string),
          'maxvalue': (itemregion.donnee[0].taux as string),
          'color': ColorMaps
        });
      }
      this.chart.caption = 'Cartographie de l\'évaluation de la promptitude d\'envoi de données : ';
      this.dataSource.chart = this.chart;
      this.dataSource.colorrange = this.colorrange;
      this.dataSource.data = this.dataAsByFusioncharts;
    }

    this.onShowValidation(planning);
  }



  onShowValidation(itemplanning: NewPlanification){
    this.servicePlanning.getAllGrroupAssignValidedPlanningArchive(itemplanning.id).subscribe(
      (response)=>{
        this.listGroupByPlanning = (<NiveauValidationM[]>response);
      },
      (error)=>{
        console.log(error);
      }
    )
  }



  initPlanning(response) {
    this.listPlannification = [];
    let formaPlanning: NewPlanification = new NewPlanification();
    const tailleArray = (<Utilisateurs[]>response).length;
    for (let i = 0; i < tailleArray; i++) {
      formaPlanning = new NewPlanification(
        response[i].id,
        response[i].libellePlanning,
        response[i].dateDebut,
        response[i].dateFin,
        response[i].frequence,
        response[i].dateEffictif,
        response[i].typeCloture,
        response[i].observations,
        null,
        response[i].baseQuestionnaires,
        response[i].objectif,
        response[i].programmerPar,
        response[i].dateFinInitiale,
        response[i].idOrigin,
        response[i].libellePlanningEN,
        response[i].observationsEN,
        response[i].objectifEN
      );
      this.listPlannification.push(formaPlanning);

    }
    this.isvisible = false;
    this.serviceNotification.configShowNotif.showLoading.show = false;

  }






  chargeBaseQuestionnaire() {
    this.serBDQuestionnaire.getBaseQuestionnaires().subscribe(
      (reponse) => {
        this.listBasequestionnaire = (<BaseQuestionnaireM[]>reponse);
      },
      (error) => {
        console.log(error);
      }
    )
  }


  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
  }

  openSm(content) {
    this.modalService.open(content, {size: 'sm'});
  }

  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  openXl(content) {
    // @ts-ignore
    this.modalService.open(content, {size: 'xl'});
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  onAvailableItemSelected(event) {
    console.log(event);

  }

  onSelectedItemsSelected(event) {
    console.log(event);

  }

  onItemsMoved(event) {
    console.log(event);

  }
}
