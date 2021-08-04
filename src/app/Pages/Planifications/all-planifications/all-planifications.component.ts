import {Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
//import * as $ from 'jquery';
import {NewPlanification} from '../../../Model/NewPlanification';
import {BaseQuestionnaireM} from '../../../Model/BaseQuestionnaireM';
import {BaseQuestionnaireService} from '../../../Services/baseQuestionnaire.service';
import {NewPlannificationService} from '../../../Services/newPlannification/new-plannification.service';
import {Utilisateurs} from '../../../Model/utilisateurs';
import {RegionM} from '../../../Model/RegionM';
import {RegionService} from '../../../Services/Region/region.service';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {translateContenufunction} from '../../../ServiceAPI/GeneralAPI';

@Component({
  selector: 'app-all-planifications',
  templateUrl: './all-planifications.component.html',
  styleUrls: ['./all-planifications.component.css'],
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

      .hide {
        display: none !important;
      }

      .show {
        display: block;
      }

      .perso.list-group-item {
        border-bottom: solid rgba(0, 0, 0, 0.42) 2px !important;
        font-style: italic !important;
      }

      .perso.list-group-item:hover {
        background-color: rgba(111, 66, 193, 0.64) !important;
        color: white !important;
      }


    `]

})
export class AllPlanificationsComponent implements OnInit, OnDestroy {

  icon = 'pe-7s-timer icon-gradient bg-premium-dark';
  currentLangue = localStorage.getItem("langue");
  currentUser = localStorage.getItem("token");

  headingFR = 'Planifications en cours';
  headingEN = 'List of all schedules';

  subheadingFR = 'Liste de toutes les planifications en cours de collecte';
  subheadingEN = 'All the schedules that were for the collections';

  detailFR = "Détail";
  detailEN = "Detail";

  modifierFR = "Modifier";
  modifierEN = "Edit";

  commencerFR = "Commencer";
  commencerEN = "Begin";

  datestartFR = "Date début";
  datestartEN = "Start date";

  dateEndFR = "Date fin";
  dateEndEN = "End date";

  dateEffectifFR = "Date effective";
  dateEffectifEN = "Effective date";

  frequenceFR = "Fréquence";
  frequenceEN = "Frequency";

  typeClotureFR = "Type de clôture";
  typeClotureEN = "Closing type";

  observationsFR = "Observations";
  observationsEN = "Observations";

  objectifsFR = "Objectifs";
  objectifsEN = "Objectives";


  closeFR = "Fermer";
  closeEN = "Close";

  aucuneProgrammationEncourFR = "Aucune programmation en cours";
  aucuneProgrammationEncourEN = "No programming in progress";

  duFR = "du";
  duEN = "from";

  auFR = "au";
  auEN = "to";

  listPlannification: NewPlanification[] = [];
  onPlanningForRead: NewPlanification;


  valeurId;
  valeurlibellePlanning;
  valeurdateDebut;
  valeurdateFin;
  valeurfrequence;
  valeurdateEffictif;
  valeurtypeCloture = '';
  valeurobservations = '';
  valeurcollectBaseQuestionnaire = '';


  reseiveData = null;
  @ViewChild('objBD') objBD;
  @ViewChild('objTitle') objTitle;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;
  dataToSend = null;
  isvisible: boolean = false;
  show = false;
  thrust = true;

  listBasequestionnaire: BaseQuestionnaireM[] = [];

  listRegion: RegionM[] = [];

  constructor(private serBDQuestionnaire: BaseQuestionnaireService,
              private servicePlanning: NewPlannificationService,
              private modalService: NgbModal,
              private serviceRegion: RegionService,
              public serviceNotification : NotificationsGeneralService) {
  }

  ngOnInit() {
    this.serviceNotification.configShowNotif.showLoading.text = translateContenufunction("Chargement planning", "Load planning");
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serviceRegion.getRegions().subscribe(
      (response) => {
        this.listRegion = (<RegionM[]>response);
      }
    )
    this.servicePlanning.getAllPlanningUser().subscribe(
      (response) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.initPlanning(response);

      },
      (error) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        console.log(error)
      }
    );

    this.chargeBaseQuestionnaire();
    this.thrust = false;

  }

  ngOnDestroy(): void {}

  onShowDetail(itemPlanning, content) {
    this.onPlanningForRead = itemPlanning;
    this.openXl(content);
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
  }


  listingDataSend(message: any) {
    this.dataToSend = null;
    if (!message.isShow) {
      this.initPlanning(message.dataToChange);
    }

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



  btnActif(objBD: HTMLDivElement, objTitle : HTMLDivElement, objgeneral : HTMLDivElement) {

    this.show = !this.show;

    if (this.show) {
      objBD.classList.remove("hide");
      objTitle.classList.add("hide");
      (objgeneral.childNodes.item(0) as HTMLButtonElement).classList.add("hide");
      (objgeneral.childNodes.item(2) as HTMLButtonElement).classList.add("hide");
      (objgeneral.childNodes.item(4) as HTMLButtonElement).name = "Annuler";
      console.log("valeurr de show : ", this.show);
      console.log("valeurr du button : ", (objgeneral.childNodes.item(4) as HTMLButtonElement).innerText );
    } else {
      console.log("LA VALEUR DE COMMENCE EST LA ?, : ", this.show);
      objBD.classList.add("hide");
      objTitle.classList.remove("hide");
      (objgeneral.childNodes.item(0) as HTMLButtonElement).classList.remove("hide");
      (objgeneral.childNodes.item(2) as HTMLButtonElement).classList.remove("hide");
      (objgeneral.childNodes.item(4) as HTMLButtonElement).name = translateContenufunction("Commencer", "begin");
    }
  }


  onSelectPlanning(formuser) {
    this.valeurId = formuser.id;
    this.valeurlibellePlanning = formuser.libellePlanning;
    this.valeurdateDebut = formuser.dateDebut;
    this.valeurdateFin = formuser.dateFin;
    this.valeurfrequence = formuser.frequence;
    this.valeurdateEffictif = formuser.dateEffictif;
    this.valeurtypeCloture = formuser.typeCloture;
    this.valeurobservations = formuser.observations;
    this.valeurcollectBaseQuestionnaire = formuser.collectBaseQuestionnaire;
  }


  onDeletePlanning(id: number, indexTabItem) {
    if (confirm("Voulez-vous vraiment supprimer cette enregistrement ?")) {
      this.servicePlanning.deletePlannification(id).subscribe(
        (reponse) => {
          this.alert.nativeElement.classList.remove('hide');
          this.alert.nativeElement.classList.add('show');
          this.listPlannification.splice(indexTabItem, 1);

        },
        (error) => {
          console.log(error.error.codeNumber);
          // try {
          if (error.error.codeNumber == 202) {
            this.alertError.nativeElement.classList.remove('hide');
            this.alertError.nativeElement.classList.add('show');
            throw new Error('');
          }
          /*}catch (e) {
            this.alertError.nativeElement.classList.remove('hide');
            this.alertError.nativeElement.classList.add('show');
          }*/

          this.alertError.nativeElement.classList.remove('hide');
          this.alertError.nativeElement.classList.add('show');

        }
      );
    }
  }


  onSendDataForPlanning(itemPlanning) {
    this.dataToSend = itemPlanning;
    this.reseiveData = itemPlanning;
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

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.alert.nativeElement.classList.add('hide');
  }

  closeAlertError() {
    this.alertError.nativeElement.classList.remove('show');
    this.alertError.nativeElement.classList.add('hide');


  }

}
