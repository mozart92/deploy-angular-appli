import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NewPlannificationService} from '../../../Services/newPlannification/new-plannification.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgModel} from '@angular/forms';
import {NewPlanification} from '../../../Model/NewPlanification';
import {LogPlanning} from '../../../Model/LogPlanning';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {translateContenufunction} from '../../../ServiceAPI/GeneralAPI';

@Component({
  selector: 'app-log-planning',
  templateUrl: './log-planning.component.html',
  styleUrls: ['./log-planning.component.sass'],
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
    .hide{
        display: none!important;
    }

    .show{
        display: block;
    }
  `]
})
export class LogPlanningComponent implements OnInit, OnDestroy {

    currentLangue =  localStorage.getItem("langue");
    heading = 'Planifications achevées';
    headingEN= 'Planning completed';
    subheading = 'Visualiser, Prolonger, Archiver les planifications arrivées à expiration';
    subheadingEN = 'View, Extend, Archive expired schedules';
    icon = 'pe-7s-timer icon-gradient bg-premium-dark';

    messageEnregistrement='Enregistrement effectué avec succès!';
    erreurEnregistrement='Erreur enregistrement! Vérifier doublons ou connexion au serveur';

    alertFR = "Alert";
    alertEN = "Alert";

    planificationArriveeFinFR = "La planification est arrivée à sa fin, elle a débutée le";
    planificationArriveeFinEN = "The planning has come to an end, it has started on the";

    prolongerPlanningFR = "Prolonger planning";
    prolongerPlanningEN = "Extend planning";

    validerFR = "valider";
    validerEN = "validate";

    cLoseFR = "Annuler";
    cLoseEN = "Cancel";

    clotureeLeFR = "et a cloturée le";
    clotureeLeEN = "and closed the";

    etatPlanificationFR = "Etat de la planification";
    etatPlanificationEN = "State of planning";

    donneesEnvoyeeFR = "total données envoyées";
    donneesEnvoyeeEN = "All data sent";

    donneesEncourFR = "données en cours de validation";
    donneesEncourEN = "data in the process of validation";

    donneesValideesFR = "données validées";
    donneesValideesEN = "validated data";

    prolongeeFR = "Prolongée";
    prolongeeEN = "Prolonged";

    cloturerArchiveeFR = "Cloturer et archivée données";
    cloturerArchiveeEN = "Closing and archiving data";

    archiveeFR = "archivée";
    archiveeEN = "archived";

    aucunePlanificationFR = "Aucune planification a été archervée";
    aucunePlanificationEN = "No planning has been completed";


    @ViewChild('alert') alert;
    @ViewChild('alertError') alertError;


    listPlanningLog: LogPlanning[] = [];
  currentPlanning: NewPlanification;

  isnotFount = true;

  constructor(public servicePlanning: NewPlannificationService,
              private modalService: NgbModal,
              private serviceNotification : NotificationsGeneralService) { }

  ngOnInit() {
    this.serviceNotification.configShowNotif.showLoading.text = translateContenufunction("Chargement en cours", "Loading in progress");
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.servicePlanning.getPlanningExpirer().subscribe(
        (response)=>{
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.listPlanningLog = (<LogPlanning[]>response);
          this.isnotFount = false;
          if (this.listPlanningLog.length==0){
            this.serviceNotification.openToast({
              titre : 'Notification',
              message : translateContenufunction("Aucune planification a été archervée", "No planning has been completed"),
              status : StatusNotification.SUCCESS
            })
          }
        },
        (error)=>{
          this.isnotFount = false;
          this.serviceNotification.configShowNotif.showLoading.show = false;
          console.log(error)
        }
    )

  }

  ngOnDestroy(): void {
  }

  onCallModal(content, program:NewPlanification){
      this.currentPlanning = program;
      this.openSm(content);
    }

    onProlongePlanning(objDate:NgModel, modal){
      this.currentPlanning.dateFin = (<Date>objDate.value);
      let tabBDQuestion = [];

      for (let itembdKestion of this.currentPlanning.baseQuestionnaires){
          tabBDQuestion.push(itembdKestion.id);
      }
      this.currentPlanning.collectBaseQuestionnaire = tabBDQuestion;

      this.servicePlanning.prolongeDateFinPlanningAcherve(this.currentPlanning).subscribe(
          (response)=>{
              modal.dismiss('Cross click');
              this.serviceNotification.swalSuccess({
                icon: StatusNotification.SUCCESS,
                title: translateContenufunction("Le prolongement de la planification s'est éffectué avec succés",   "The extension of the planning process was successfully carried out"),
                showConfirmButton: true,
                timer: 5000
              });
              this.ngOnInit();
          },
          (error)=>{
              modal.dismiss('Cross click');
              console.log(error);
              this.serviceNotification.swalError({
                icon: StatusNotification.ERROR,
                title: translateContenufunction("Echec de l'Opération", "Operation failure"),
                text: translateContenufunction("Echec du prolongement de la planification, une erreur s'est prolongé. Réessayer plus tard.", "Failure to extend the planning, an error was prolonged. Try again later.")
              })
          }
      )

    }


    onArchiver(planning:NewPlanification){

      let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm();
      valFornotif.then((result) => {
        if (result.value) {
          this.serviceNotification.configShowNotif.showLoading.text = translateContenufunction("Archivage en cours",  "Archiving in progress");
          this.serviceNotification.configShowNotif.showLoading.show = true;
          this.servicePlanning.archivePlanning(planning).subscribe(
            (reponse)=>{
              this.serviceNotification.configShowNotif.showLoading.show = false;

              swalWithBootstrapButtons.fire(
                translateContenufunction('Archivage', 'Archive'),
                translateContenufunction("L'archivage s'est éffectué avec succès !!",  "The archiving has been successfully completed !"),
                StatusNotification.SUCCESS
              );
              this.ngOnInit();
            },
            (error)=>{
              this.serviceNotification.configShowNotif.showLoading.show = false;
              swalWithBootstrapButtons.fire(
                translateContenufunction('Archivage planification expirée', 'Archiving expired planning'),
                translateContenufunction( "Echec de l'archivage de la plannification, une erreur s'est certainement produite. Reessayer plus tard.",  "Failure of the planning archiving, an error certainly occurred. Try again later."),
                StatusNotification.ERROR
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            translateContenufunction('Cancelled', 'Cancelled'),
            translateContenufunction("Vous venez d'annuler votre opération d'archivage", "You have just cancelled your archiving operation"),
            translateContenufunction("erreur", "error")
          );
        }
      });

    }



    closeAlert() {
        this.alert.nativeElement.classList.remove('show');
        this.alert.nativeElement.classList.add('hide');
    }

    closeAlertError() {
        this.alertError.nativeElement.classList.remove('show');
        this.alertError.nativeElement.classList.add('hide');
    }


    openBackDropCustomClass(content) {
        this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
    }

    openWindowCustomClass(content) {
        this.modalService.open(content, { windowClass: 'dark-modal' });
    }

    openSm(content) {
        this.modalService.open(content, { size: 'sm' });
    }

    openLg(content) {
        this.modalService.open(content, { size: 'lg' });
    }

    openXl(content) {
        // @ts-ignore
        this.modalService.open(content, { size: 'xl' });
    }

    openVerticallyCentered(content) {
        this.modalService.open(content, { centered: true });
    }

    onAvailableItemSelected(event){
        console.log(event);

    }

    onSelectedItemsSelected(event){
        console.log(event);

    }

    onItemsMoved(event){
        console.log(event);

    }





}
