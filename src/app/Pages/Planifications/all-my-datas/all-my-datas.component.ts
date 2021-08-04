import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnwserQuestions} from '../../../Model/anwserQuestions';
import {AnwserQuestionsService, TypeAllMyDatas} from '../../../Services/anwserQuestions/anwser-questions.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EchangeDataService} from '../../../Services/EchangeData/echange-data.service';
import {ThemeOptions} from '../../../theme-options';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';

@Component({
  selector: 'app-all-my-datas',
  templateUrl: './all-my-datas.component.html',
  styleUrls: ['./all-my-datas.component.sass'],
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
    }

    .details-datas{
      right: 9px!important;
      display: block!important;
      z-index: 100000!important;
    }
  `]
})
export class AllMyDatasComponent implements OnInit, OnDestroy {

  heading = 'Toutes mes données des collectes. Compte : ' + localStorage.getItem('token');
  subheading = 'visualisation';
  icon = 'pe-7s-timer icon-gradient bg-premium-dark';


  labelTitreFormulaire = 'Enregistrement des données';
  labelButtonSave = 'Enregistrer';
  labelTitreTableau = 'Liste de vos données enregistrées';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  titreBoutonEnvoi = 'soumettre';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';


  listDataSend: TypeAllMyDatas[] = [];
  enteteTab: any[] = [];
  bodyTab: any[] = [];
  dataConvert: any[]=[];

  @ViewChild('objModal') objModal;

  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;
  isvisible: boolean = false;


  LIMIT_PARGINATION = 10;
  listForPaginaition: TypeAllMyDatas[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  term = '';

  inputData : AnwserQuestions = null;

  isShowTabBox = false;
  isShowDetailsDatas = false;

  constructor(private servicedate: AnwserQuestionsService,
              private modalService: NgbModal,
              private serviceEchangeData: EchangeDataService,
              public globals: ThemeOptions,
              public serviceNotification : NotificationsGeneralService) {
    globals.isMasquerCommentaire = true;
  }

  ngOnInit() {
    this.listForPaginaition = [];
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.servicedate.getAllMyDatas().subscribe(
      (datas) => {
        //console.log("donnee deja valide : ", datas);
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Le chargement de vos donnees éffectué avec succees", status : StatusNotification.SUCCESS});
        this.listForPaginaition = datas;
        this.servicedate.NOTIFICATION_ALL_MY_DATAS = (<TypeAllMyDatas[]>datas).length;
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


  onShowContenuData(idcontenu: AnwserQuestions) {


    // @ts-ignore
    const dataConvert =  JSON.parse(idcontenu.reponseJson);
    // @ts-ignore
    this.dataConvert =  (JSON.parse(idcontenu.reponseJson) as any[]);
    this.enteteTab = Object.keys(dataConvert);
    this.bodyTab = Object.values(dataConvert);

    this.isShowTabBox = true;
    this.isShowDetailsDatas = true;

    //this.openXl(content);
  }

  OnComeBack(){
    this.isShowTabBox = false;
    this.isShowDetailsDatas = false;
  }


  onLoading() {this.ngOnInit();}

  onChangePageRecup(dataRecup) {
    this.listDataSend = [];
    if (dataRecup == 1) {
      this.listDataSend = this.listForPaginaition.slice(0, 10);
    } else {
      this.listDataSend = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (10 * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listDataSend = this.listForPaginaition.slice(0, valNbre);
  }


}
