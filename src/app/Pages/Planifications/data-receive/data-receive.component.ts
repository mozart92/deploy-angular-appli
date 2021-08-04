import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AnwserQuestions} from '../../../Model/anwserQuestions';
import {AnwserQuestionsService} from '../../../Services/anwserQuestions/anwser-questions.service';
import {EchangeDataService} from '../../../Services/EchangeData/echange-data.service';
import {ThemeOptions} from '../../../theme-options';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';


@Component({
  selector: 'app-data-receive',
  templateUrl: './data-receive.component.html',
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

    .barge-perso{
      width: auto!important;
      height: 20px!important;
      min-width: 20px;
      text-indent: 0;
      font-size: initial;
      color:goldenrod;
    }

    .card-box{
      position: relative;
    }

    #delay{
      position: absolute;
      width: 100%;
      right: -120%;
      display: none;
      z-index: 0;
    }

    body{
      overflow-x: hidden;
    }

    .tab-box-datas{
      display: none;
      /*position: absolute;
      left: -100%;*/
    }

    .details-datas{
      right: 9px!important;
      display: block!important;
      z-index: 100000!important;
    }


  `]

})
export class DataReceiveComponent implements OnInit, OnDestroy {

  heading = 'Visualisation des données reçues pour validation. Compte : ' + localStorage.getItem('token');
  subheading = 'visualiser, modifier, supprimer, Envoyer';
  icon = 'pe-7s-timer icon-gradient bg-premium-dark';


  labelTitreFormulaire = 'Enregistrement des données';
  labelButtonSave = 'Enregistrer';
  labelTitreTableau = 'Liste des données enregistrées';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  titreBoutonEnvoi = 'soumettre';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';


  listDataSend: AnwserQuestions[] = [];
  enteteTab: any[] = [];
  bodyTab: any[] = [];
  dataConvert: any[]=[];

  @ViewChild('objModal') objModal;

  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;
  isvisible: boolean = false;


  LIMIT_PARGINATION = 10;
  listForPaginaition: AnwserQuestions[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  inputData : AnwserQuestions = null;
  isShowTabBox = false;
  isShowDetailsDatas = false;

  term = '';


  constructor(private servicedate: AnwserQuestionsService,
              private modalService: NgbModal,
              private serviceEchangeData: EchangeDataService,
              public globals: ThemeOptions,
              public serviceNotification : NotificationsGeneralService) {
    globals.isMasquerCommentaire = false;
  }

  ngOnInit() {
    this.listForPaginaition = [];
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.servicedate.getAllDatasReceive().subscribe(
      (datas) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Le chargement de vos donnees éffectué avec succees", status : StatusNotification.SUCCESS});
        this.listForPaginaition = (<AnwserQuestions[]>datas);
        this.servicedate.NOTIFICATION_DATA_RECUS = (<AnwserQuestions[]>datas).length;
        this.listDataSend = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.listDataSend = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
        this.serviceEchangeData.injectDataFichers(this.listForPaginaition);
      },
      (error) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement de vos données, verifier votre connection au serveur", status : StatusNotification.ERROR});
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {}

  toggleDrawer(idDataFormCommentaire : number) {
    this.globals.idDataForCommentaire = idDataFormCommentaire;
    this.globals.getAllCommentaireServiceGeneral(idDataFormCommentaire);
  }


  onShowContenuData(content, idcontenu: AnwserQuestions) {


    // @ts-ignore
    const dataConvert =  JSON.parse(idcontenu.reponseJson);
    // @ts-ignore
    this.dataConvert =  (JSON.parse(idcontenu.reponseJson) as any[]);
    this.enteteTab = Object.keys(dataConvert);
    this.bodyTab = Object.values(dataConvert);

    this.isShowTabBox = true;
    this.isShowDetailsDatas = true;
  }

  OnComeBack(){
    this.isShowTabBox = false;
    this.isShowDetailsDatas = false;
  }

  onEnvoiData(data, y) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    this.servicedate.getDataNoSendUser(data).subscribe(
      (reponse) => {
        this.serviceNotification.configShowNotif.showModalBlock = false;
        // @ts-ignore
        this.messageEnregistrement = reponse.message;
        this.serviceNotification.swalInfo({
          html : this.messageEnregistrement,
          title: 'Info Notification',
          icon: StatusNotification.SUCCESS,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Bien reçu!',
        });
        //this.serviceNotification.openToast({titre : "Notification", message : this.messageEnregistrement, status : StatusNotification.SUCCESS});
        this.ngOnInit();
        this.servicedate.nbreNotificationDonneDajeEnvoyer();
      },
      (error) => {
        this.serviceNotification.configShowNotif.showModalBlock = false;
        console.log(error.error);
        if (error.error.codeNumber==103){
          this.erreurEnregistrement = error.error.message;
          this.serviceNotification.swalInfo({
            html : error.error.message,
            title: 'Info Notification',
            icon: StatusNotification.ERROR,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Bien reçu!',
          });
          //this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
        }else{
          this.serviceNotification.openToast({titre : "Notification", message : "Echec de l'enregistrement, verifier votre connection au serveur", status : StatusNotification.ERROR});
        }
      }
    )
  }

  onLoading() {this.ngOnInit();}


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


  onChangePageRecup(dataRecup) {
    this.page = dataRecup;
    this.listDataSend = [];
    if (dataRecup == 1) {
      this.listDataSend = this.listForPaginaition.slice(0, 10);
    } else {
      this.listDataSend = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (10 * dataRecup));
    }
  }

  onReturnData(objData : AnwserQuestions){
    this.serviceNotification.configShowNotif.showModalBlock = true;
    this.servicedate.forwardData(objData).subscribe(
      (response)=>{
        this.serviceNotification.configShowNotif.showModalBlock = false;
        this.messageEnregistrement = "La donnees a été renvoyé au niveau inferieur avec succes!!";
        this.serviceNotification.openToast({titre : "Notification", message : this.messageEnregistrement, status : StatusNotification.SUCCESS});
        this.ngOnInit();
      },
      (error)=>{
        this.serviceNotification.configShowNotif.showModalBlock = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Echec de tranfert de la données, vérifier votre connection au serveur", status : StatusNotification.ERROR});
        console.log(error);
      }
    )
  }

  onEditeData(valData : AnwserQuestions){
    this.inputData = valData;
  }

  onComeBackEditeData(event){
    this.inputData = null;
  }
  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listDataSend = this.listForPaginaition.slice(0, valNbre);
  }


}
