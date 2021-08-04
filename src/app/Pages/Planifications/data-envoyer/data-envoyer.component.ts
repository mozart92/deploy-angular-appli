import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AnwserQuestions, ImagesAttachees} from '../../../Model/anwserQuestions';
import {AnwserQuestionsService} from '../../../Services/anwserQuestions/anwser-questions.service';
import {ThemeOptions} from '../../../theme-options';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";


@Component({
  selector: 'app-data-envoyer',
  templateUrl: './data-envoyer.component.html',
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

export class DataEnvoyerComponent implements OnInit, OnDestroy {

  heading = 'Visualisation des données collectées, Compte : '+localStorage.getItem("token");
  subheading = 'Visualiser, modifier, supprimer, commenter les données collectées en cours d\'envoi';
  icon = 'pe-7s-timer icon-gradient bg-premium-dark';

  labelTitreFormulaire = 'Enregistrement des données';
  labelButtonSave = 'Enregistrer';
  labelTitreTableau = 'Liste des données enregistrées';
  actionFormulaire='Enregistrer';
  titreBoutonEdit='Modifier';
  titreBoutonDelete='Supprimer';
  titreBoutonEnvoi = "soumettre";
  messageEnregistrement='Enregistrement effectué avec succès!';
  erreurEnregistrement='Erreur enregistrement! Vérifier doublons ou connexion au serveur';


  listDataSend: AnwserQuestions[] = [];
  enteteTab: any[]=[];
  bodyTab: any[]=[];
  dataConvert: any[]=[];

  isVisible = false;

  @ViewChild("objModal") objModal;

  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;


  LIMIT_PARGINATION = 10;
  listForPaginaition: AnwserQuestions[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  inputData : AnwserQuestions = null;

  isShowTabBox = false;
  isShowDetailsDatas = false;

  term = '';

  listAllImagesAttachees : ImagesAttachees[] = [];

   tabFormatImagesPlugin : Array<{img : string, thumb : string, description : string}> = [];


  constructor(private servicedate: AnwserQuestionsService,
              private modalService: NgbModal,
              public globals: ThemeOptions,
              public serviceNotification : NotificationsGeneralService) {
    globals.isMasquerCommentaire = false;

  }

  ngOnInit() {
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.listForPaginaition = [];
    this.servicedate.getAllDataNoReadByUsers().subscribe(
        (datas) => {
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.openToast({titre : "Notification", message : "Le chargement de vos donnees éffectué avec succees", status : StatusNotification.SUCCESS});
          this.listForPaginaition = (<AnwserQuestions[]>datas);
          this.servicedate.NOTIFICATION_DATA_REMPLIS = (<AnwserQuestions[]>datas).length;
          this.servicedate.nbreNotificationAllMyDatas();
          this.listDataSend = [];
          this.countItemAffcihe = this.listForPaginaition.length;
          this.listDataSend = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
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

  readImageAttachee(id){
    this.servicedate.getAllImagesAttachees(id).subscribe(
      (datas)=>{
        console.log("touls les images attache a cette donnees : ", datas);

        this.listAllImagesAttachees = (datas as ImagesAttachees[]);

        /*let tabFormatImagesPlugin : Array<{img : string, thumb : string, description : string}> = [];*/

        for(let itemImage of (datas as ImagesAttachees[])){
          this.tabFormatImagesPlugin.push({img : `assets/images/imageFiche/${itemImage.nameImage}`, thumb : `assets/images/imageFiche/${itemImage.nameImage}`, description : 'image'});
        }

        console.log("format pour le plugin  :", this.tabFormatImagesPlugin)

      },
      (error)=>{
        console.log("voici les erruer a attache : ", error);
      }
    )
  }


  onShowContenuData(content, idcontenu: AnwserQuestions){


    // @ts-ignore
   const dataConvert =  JSON.parse(idcontenu.reponseJson);
    // @ts-ignore
   this.dataConvert =  (JSON.parse(idcontenu.reponseJson) as any[]);
   this.enteteTab = Object.keys(dataConvert);
   this.bodyTab = Object.values(dataConvert);

   this.isShowTabBox = true;
   this.isShowDetailsDatas = true;
    //this.openXl(content);

    this.readImageAttachee(idcontenu.id);


  }

  OnComeBack(){
    this.isShowTabBox = false;
    this.isShowDetailsDatas = false;
  }

  onDeleteData(idData, indexTab){

    let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm();
    valFornotif.then((result) => {
      if (result.value) {
        this.serviceNotification.configShowNotif.showLoading.text = "Suppression en cours";
        this.serviceNotification.configShowNotif.showLoading.show = true;
        this.servicedate.deleteAnwserQuestion(idData).subscribe(
          (reponse)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
            this.messageEnregistrement = "suppression effectue avec success!";

            swalWithBootstrapButtons.fire(
              'Deleted!',
              this.messageEnregistrement,
              StatusNotification.SUCCESS
            );
            this.listForPaginaition.splice(indexTab, 1);
            this.ngOnInit();
          },
          (error)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
            console.log(error.error.codeNumber);
            this.erreurEnregistrement = "Echec de la suppression, verifier la connection avec le serveur!";
            swalWithBootstrapButtons.fire(
              'Deleted!',
              this.erreurEnregistrement,
              StatusNotification.ERROR
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Vous venez d\'annuler votre opération de suppression',
          'error'
        );
      }
    });

  }



  onLoading(){this.ngOnInit();}


  onEnvoiData(data, y){
    this.serviceNotification.configShowNotif.showModalBlock = true;
    this.servicedate.getDataNoSendUser(data).subscribe(
        (reponse)=>{
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
        (error)=>{
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





  openXl(content) {
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' });
  }



  onChangePageRecup(dataRecup){
    this.page = dataRecup;
    this.listDataSend = [];
    if (dataRecup==1){
      this.listDataSend = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    }else {
      this.listDataSend = this.listForPaginaition.slice(((dataRecup - 1)*this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION*dataRecup));
    }
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
