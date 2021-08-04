import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseQuestionnaireM} from '../../../Model/BaseQuestionnaireM';
import {BaseQuestionnaireService} from '../../../Services/baseQuestionnaire.service';
import {EchangeDataService} from '../../../Services/EchangeData/echange-data.service';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {translateContenufunction} from '../../../ServiceAPI/GeneralAPI';


@Component({
  selector: 'app-nouveau-questionnaire',
  templateUrl: './nouveau-questionnaire.component.html',
    styles: [".hide{\n" +
    "    display: none!important;\n" +
    "}\n" +
    "\n" +
    ".show{\n" +
    "    display: block;\n" +
    "}"]
})
export class NouveauQuestionnaireComponent implements OnInit, OnDestroy {
    @ViewChild('f') formValues;

    currentLangue = localStorage.getItem("langue");

    labelButtonSave = 'Enregistrer';
    actionFormulaire='Enregistrer';

    titreBoutonEdit='Modifier';
    titreBoutonEditEN='Modifier';

    titreBoutonDelete='Supprimer';
    titreBoutonDeleteEN='Supprimer';


    heading = 'Gestion des bases de questionnaires';
    headingFR = 'Management of questionnaire databases';

    subheading = '';
    subheadingFR = '';
    icon = 'pe-7s-config icon-gradient bg-premium-dark';

    labelTitreFormulaire = 'Informations générales';
    labelTitreFormulaireEN = 'General information';



    nomBaseLabel = 'Nom de la base de questionnaires';
    nomBaseLabelEN = 'Name of the questionnaire database';

    lienMenuLabel = 'Lien de menu';
    lienMenuLabelEN = 'Slide the menu';

    descriptionLabel = 'Description';
    descriptionLabelEN = 'Description';

    statutLabel = 'Statut';
    statutLabelEN = 'Status';

    selectStatut= 'Choisir';
    selectStatutEN= 'Choose';

    labelTitreTableau = 'Liste des bases de données enregistrées';
    labelTitreTableauEN = 'List of registered databases';

   enregistrementBasesQuestionnairesFR ="Enregistrement des bases de questionnaires";
   enregistrementBasesQuestionnairesEN ="Registration of questionnaire bases";

   annulerFR = "Annuler";
   annulerEN = "Cancel";

   champVideIncorrecteFR = "Champ vide ou incorrecte, veuillez vérifier";
   champVideIncorrecteEN = "Empty or incorrect field, please check";

   insererLibelleBaseCollecteFR = "Insérer libellé base collecte";
   insererLibelleBaseCollecteEN = "Insert wording base collection";

   insererBaseCollecteFR = "Insérer lien base collecte";
   insererBaseCollecteEN = "Insert link base collection";

   brieveDescriptionBaseCollecteFR = "Briève description base collecte";
   brieveDescriptionBaseCollecteEN = "Brief description collection base";

   actifFR = "Actif";
   actifEN = "Active";

  nonDisponibleFR = "Non disponible";
  nonDisponibleEN = "Not available";

   enCoursParametrageFR = "En cours de paramétrage";
   enCoursParametrageEN = "In the process of setting up";

   archiveFR = "Archivé";
   archiveEN = "Archived";

  listeBaseQuestionnairesEnregistresFR = "Liste des bases de questionnaires enregistrés";
  listeBaseQuestionnairesEnregistresEN = "List of registered questionnaire databases";

  nomBaseCollecteFR = "Nom base de collecte";
  nomBaseCollecteEN = "Name collection base";

  lienMenuFR = "Lien menu";
  lienMenuEN = "Menu link";

  descriptionFR = "Description";
  descriptionEN = "Description";

  statusFR = "Statut";
  statusEN = "Status";

  rafraichirTableauFR = "Rafraichir votre tableau";
  rafraichirTableauEN = "Refresh your painting";


    isvisible: boolean=false;

    valeurSNomBase='';
    valeurSLienMenu='';
    valeurSDescription='';
    valeurSNomBaseEN='';
    valeurSLienMenuEN='';
    valeurSDescriptionEN='';
    valeurSStatut='';

    @ViewChild('alert') alert;
    @ViewChild('alertError') alertError;

    basequestionnaires : BaseQuestionnaireM[] = [];
    pageOfItems: Array<any>;
    id:number;
    model: any = {};

    listQuestion: any[] = [];


    LIMIT_PARGINATION = 10;
    listForPaginaition: BaseQuestionnaireM[] = [];
    countItemAffcihe: number = 0;
    page = 1;

    term = '';


    @Output() chargeQuestion = new EventEmitter();


    constructor(private baseQuestionnaireService : BaseQuestionnaireService,
                private route: ActivatedRoute,
                private router: Router,
                private passData: EchangeDataService,
                public serviceNotification : NotificationsGeneralService) { }

    ngOnInit() {
      this.page = 1;
      this.serviceNotification.configShowNotif.showLoading.text = translateContenufunction("Chargement en cours", "Loading in progress");
      this.serviceNotification.configShowNotif.showLoading.show = true;
        this.listForPaginaition = [];
        this.baseQuestionnaireService.getBaseQuestionnaires()
            .subscribe(data=>{
              this.serviceNotification.configShowNotif.showLoading.show = false;
                this.serviceNotification.openToast({
                  titre : translateContenufunction("Notification", "Notice"),
                  message : translateContenufunction("Le chargement des bases de collectes c'est éffectué avec succees", "The loading of the collection bases is carried out in a very efficient way.") ,
                  status : StatusNotification.SUCCESS
                });
                this.listForPaginaition = (<BaseQuestionnaireM[]>data);
                this.basequestionnaires = [];
                this.countItemAffcihe = this.listForPaginaition.length;
                this.basequestionnaires = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
                this.passData.injecteData(data);
                this.listQuestion.push(data);
            },error => {
              this.serviceNotification.configShowNotif.showLoading.show = false;
              if(error.status == 0){
                this.serviceNotification.openToast(
                  {titre : translateContenufunction("Notification", "Notice"),
                    message : translateContenufunction("Probleme de connexcion au serveur, vérifier votre connexion internet", "Probleme de connexcion au serveur, vérifier votre connexion internet"),
                    status : StatusNotification.ERROR
                  });
              }else{
                this.serviceNotification.openToast(
                  {titre : translateContenufunction("Notification", "Notice"),
                    message : translateContenufunction("Erreur inconnu, veuillez contacter l'administrateur", "Erreur inconnu, veuillez contacter l'administrateur"),
                    status : StatusNotification.ERROR
                  });
              }

                console.log(error);
            })
    }

    ngOnDestroy(): void {}


  onLoading(){this.ngOnInit();}


    onSaveBaseQuestionnaire(dataForm) {
      this.serviceNotification.configShowNotif.showModalBlock = true;
        if(this.actionFormulaire=="Enregistrer") {
            this.baseQuestionnaireService.saveBaseQuestionnaire(dataForm)
                .subscribe(data => {
                  this.serviceNotification.configShowNotif.showModalBlock = false;
                  this.serviceNotification.openToast(
                    {titre : translateContenufunction("Notification", "Notice"),
                      message : translateContenufunction("Enregistrement fait avec succes!!", "Successful registration!"),
                      status : StatusNotification.SUCCESS
                    });
                    this.formValues.resetForm();
                    this.ngOnInit();
                    this.listQuestion.push(data);
                    this.passData.injecteData(this.listQuestion);
                }, error => {
                  this.serviceNotification.configShowNotif.showModalBlock = false;
                  this.serviceNotification.openToast(
                    {titre : translateContenufunction("Notification", "Notice"),
                      message : translateContenufunction("Echec de l'enregistrement, verifier votre connection au serveur", "Registration failed, check your connection to the server."),
                      status : StatusNotification.ERROR
                    });
                })

        }
        else if(this.actionFormulaire=="Modifier") {

            this.baseQuestionnaireService.updateBaseQuestionnaire(this.id, dataForm)
                .subscribe(data => {
                  this.serviceNotification.configShowNotif.showModalBlock = false;
                  this.serviceNotification.openToast(
                    {titre : translateContenufunction("Notification", "Notice"),
                      message : translateContenufunction("Modification fait avec succes !!!!!", "Modification made with success !!!!!"),
                      status : StatusNotification.SUCCESS
                    });
                    this.formValues.resetForm();
                    this.ngOnInit();
                    this.labelButtonSave = 'Enregistrer';
                    this.actionFormulaire = 'Enregistrer';
                }, error => {
                  this.serviceNotification.configShowNotif.showModalBlock = false;
                  this.serviceNotification.openToast(
                    {titre : translateContenufunction("Notification", "Notice"),
                      message : translateContenufunction("Echec de la modification, verifier avotre connection avec le serveur!", "Failed modification, check your connection to the server!"),
                      status : StatusNotification.ERROR
                    });
                });
        }
    }


    onDeleteBDanwser(id: number) {

      let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm({
        title: translateContenufunction('Etes-vous sure de vouloir supprimer cette base de collecte?', 'Are you sure you want to delete this collection base?'),
        icon: StatusNotification.WARNING,
        showCancelButton: true,
        confirmButtonText: translateContenufunction('Oui, supprimer !', 'Yes, delete!'),
        cancelButtonText: translateContenufunction('Non, annuler!', 'No, cancel!'),
        reverseButtons: true
      });
      valFornotif.then((result) => {
        if (result.value) {
          this.serviceNotification.configShowNotif.showLoading.text = translateContenufunction("Suppression en cours", "Deletion In progress");
          this.serviceNotification.configShowNotif.showLoading.show = true;
          this.baseQuestionnaireService.deleteBaseQuestionnaire(id).subscribe(
            (reponse)=>{
              this.serviceNotification.configShowNotif.showLoading.show = false;

              swalWithBootstrapButtons.fire(
                translateContenufunction('Suppréssion!', 'Delete!'),
                translateContenufunction("suppression effectue avec success!", "deletion successfully completed!"),
                StatusNotification.SUCCESS
              );
              this.ngOnInit();
            },
            (error)=>{
              this.serviceNotification.configShowNotif.showLoading.show = false;
              swalWithBootstrapButtons.fire(
                translateContenufunction('Suppréssion!', 'Delete!'),
                translateContenufunction("Echec de la suppression, verifier la connection avec le serveur!", "Deletion failed, check the connection to the server!"),
                StatusNotification.ERROR
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            translateContenufunction('Annulation', 'Cancellation'),
            translateContenufunction('Vous venez d\'annuler votre opération de suppression', 'You have just cancelled your deletion operation'),
            translateContenufunction("erreur", 'error')
          );
        }
      });
    }




    cancelAction(){
        this.labelButtonSave="Enregistrer";
        this.formValues.resetForm();
    }



    onSelectBaseQuestionnaire(basequestionnaires) {

      this.formValues.resetForm({
        nomBase : basequestionnaires.nomBase,
        lienMenu : basequestionnaires.lienMenu,
        description : basequestionnaires.description,
        nomBaseEN :  basequestionnaires.nomBaseEN,
        lienMenuEN : basequestionnaires.lienMenuEN,
        descriptionEN : basequestionnaires.descriptionEN,
        statut : basequestionnaires.statut
      });

      this.id = basequestionnaires.id;
      this.labelButtonSave = 'Modifier';
      this.actionFormulaire = 'Modifier';

      /*  this.valeurSNomBase=basequestionnaires.nomBase;
        this.valeurSLienMenu=basequestionnaires.lienMenu;
        this.valeurSLienMenuEN=basequestionnaires.lienMenuEN;
        this.valeurSDescription=basequestionnaires.description;
        this.valeurSDescriptionEN=basequestionnaires.descriptionEN;
        this.valeurSStatut=basequestionnaires.statut;
      this.valeurSNomBaseEN=basequestionnaires.nomBaseEN;*/
    }


    onChangePageRecup(dataRecup){
      this.page = dataRecup;
        this.basequestionnaires = [];
        if (dataRecup==1){
            this.basequestionnaires = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
        }else {
            this.basequestionnaires = this.listForPaginaition.slice(((dataRecup - 1)*this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION*dataRecup));
        }
    }

    onChangeNbreDatasAffiche(valNbre){
      this.LIMIT_PARGINATION = valNbre;
      this.page = 1;
      this.basequestionnaires = this.listForPaginaition.slice(0, valNbre);
    }



}
