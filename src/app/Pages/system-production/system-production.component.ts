import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SystemProductionM} from '../../Model/SystemProductionM';
import {SystemProductionService} from '../../Services/SystemProduction/system-production.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from '../../../assets/i18n/fr.json';
// @ts-ignore
import LanguageEN from '../../../assets/i18n/en.json';


@Component({
  selector: 'app-system-production',
  templateUrl: './system-production.component.html',
  styleUrls: ['./system-production.component.sass'],
  styles: ['.hide{\n' +
  '    display: none!important;\n' +
  '}\n' +
  '\n' +
  '.show{\n' +
  '    display: block;\n' +
  '}']
})
export class SystemProductionComponent implements OnInit, OnDestroy {


  heading = 'Gestion des systèmes de production';
  subheading = 'Enregistrer, modifier et supprimer les systèmes de production du Cameroun. Tous les champs sont obligatoires';
  icon = 'pe-7s-config icon-gradient bg-premium-dark';


  labelTitreFormulaire = 'Informations générales';
  labelButtonSave = 'Enregistrer';
  labelCodeSystemProduction = "Code systeme de production";
  labelLibelleSystemProductionFR = "Libellé systeme production FR";
  labelLibeleSystemProductionEN = "Libellé systeme production EN";


  labelTitreTableau = 'Liste des systèmes de production enregistrées';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  valeurID : number;
  valeurCodeSystemProduction : string = '';
  valeurLibelleSystemProductionFR : string = '';
  valeurLibelleSystemProductionEN :string = '';
  valeurArondissement : any;

  //LES VALEUR POUR LE PRELOADE
  isvisible: boolean = false;
  dataPreload: boolean = false;


  //ACCES AU ELEMENT DU DOM
  @ViewChild('f') f;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  //DELCARATION DES VARIABLE PROPRE AU RESSOURCE DU COMPOSANT
  listSystemProduction: SystemProductionM[]= [];


  //DECLARATION POUR LE PAGINATION
  LIMIT_PARGINATION = 10;
  listForPaginaition: SystemProductionM[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  term : string;


  constructor(private serviceSystemProduction: SystemProductionService,
              public serviceNotification : NotificationsGeneralService,
              private translate : TranslateService) {


    if (localStorage.getItem("langue")=="fr"){
      this.translate.setTranslation(`${localStorage.getItem("langue")}`, defaultLanguage);
      this.translate.use(`${localStorage.getItem("langue")}`);
    }
    if (localStorage.getItem("langue")=="en"){
      this.translate.setTranslation(`${localStorage.getItem("langue")}`, LanguageEN);
      this.translate.use(`${localStorage.getItem("langue")}`);
    }

  }

  ngOnInit() {
    this.page = 1;
    this.listForPaginaition = [];
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serviceSystemProduction.getSystemProduction()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.listForPaginaition = (<SystemProductionM[]>data);
        this.listSystemProduction = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.listSystemProduction = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
        this.dataPreload = true;
        this.serviceNotification.openToast({
          titre : "Notification",
          message : "Chargement des donnees réussi!!",
          status : StatusNotification.SUCCESS});
      }, error => {
        this.dataPreload = true;
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : "Notification",
          message : "Echec du chargement des donnees, vérifier votre connection au serveur",
          status : StatusNotification.ERROR
        });
        console.log(error);
      })

  }


  ngOnDestroy(): void {
  }

  cancelAction() {
    this.f.resetForm();
    this.labelButtonSave = 'Enregistrer';
  }

  onDeleteSystemProduction(id: number) {

    let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm({
      title: 'Etes-vous sure de vouloir supprimer cette donnees?',
      icon: StatusNotification.WARNING,
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    });
    valFornotif.then((result) => {
      if (result.value) {
        this.serviceNotification.configShowNotif.showLoading.text = "Suppression en cours";
        this.serviceNotification.configShowNotif.showLoading.show = true;
        this.serviceSystemProduction.deleteSystemProduction(id).subscribe(
          (reponse)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
            this.messageEnregistrement = "suppression effectue avec success!";

            swalWithBootstrapButtons.fire(
              'Suppréssion!',
              this.messageEnregistrement,
              StatusNotification.SUCCESS
            );
            this.ngOnInit();
          },
          (error)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
            console.log(error.error.codeNumber);
            this.erreurEnregistrement = "Echec de la suppression, verifier la connection avec le serveur!";
            swalWithBootstrapButtons.fire(
              'Suppréssion!',
              this.erreurEnregistrement,
              StatusNotification.ERROR
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Annulation',
          'Vous venez d\'annuler votre opération de suppression',
          'error'
        );
      }
    });
  }


  onSaveSystemProduction(dataForm) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    if (this.actionFormulaire == 'Enregistrer') {

      let formatSystemProduction: SystemProductionM = new SystemProductionM();

      formatSystemProduction = new SystemProductionM(null,
        dataForm.codeSystemProduction,
        dataForm.libelleSystemProductionFR,
        dataForm.libelleSystemProductionEN
      );

      this.isvisible = true;
      this.serviceSystemProduction.saveSystemProduction(formatSystemProduction)
        .subscribe(data => {
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.messageEnregistrement = 'Enregistrement fait avec succes!';

          this.serviceNotification.swalSuccess({
            icon: StatusNotification.SUCCESS,
            title: "Enregistrement éffectué avec succés!!",
            showConfirmButton: true
          });

          this.f.resetForm();
          this.ngOnInit();

        }, error => {
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.erreurEnregistrement = 'Echec de l\'enregistrement, verifier votre connection au serveur';

          this.serviceNotification.swalError({
            icon: StatusNotification.ERROR,
            title: "Echec de l'Opération",
            text: this.erreurEnregistrement
          });
          console.log(error)
        })

    }
    else if (this.actionFormulaire == 'Modifier') {

      let formatSystemProductionUpdate: SystemProductionM = new SystemProductionM();
      formatSystemProductionUpdate = new SystemProductionM(this.valeurID,
        dataForm.codeSystemProduction,
        dataForm.libelleSystemProductionFR,
        dataForm.libelleSystemProductionEN
      );

      this.serviceSystemProduction.updateSystemProduction(formatSystemProductionUpdate)
        .subscribe(data => {

          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.messageEnregistrement = 'Modification fait avec succes !!!!!';

          this.serviceNotification.swalSuccess({
            icon: StatusNotification.SUCCESS,
            title: "Modification éffectué avec succés!!",
            showConfirmButton: true
          });

          this.f.resetForm();
          this.ngOnInit();
          this.labelButtonSave = 'Enregistrer';
          this.actionFormulaire = 'Enregistrer';

        }, error => {
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.erreurEnregistrement = 'Echec de la modification, verifier votre connection avec le serveur!';
          this.serviceNotification.swalError({
            icon: StatusNotification.ERROR,
            title: "Echec de l'Opération",
            text: this.erreurEnregistrement
          });
          console.log(error);
        })
    }

  }

  onSelect(objFormul:SystemProductionM) {

    this.valeurID = objFormul.id;
    this.valeurCodeSystemProduction = objFormul.codeSystemProduction;
    this.valeurLibelleSystemProductionFR = objFormul.libelleSystemProductionFR;
    this.valeurLibelleSystemProductionEN = objFormul.libelleSystemProductionEN;

    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';
  }


  onChangePageRecup(dataRecup) {
    this.page = dataRecup;
    this.listSystemProduction = [];
    if (dataRecup == 1) {
      this.listSystemProduction = this.listForPaginaition.slice(0, 10);
    } else {
      this.listSystemProduction = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (10 * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listSystemProduction = this.listForPaginaition.slice(0, valNbre);
  }



}
