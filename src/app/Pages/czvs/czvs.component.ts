import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommuneM} from '../../Model/CommuneM';
import {CzvsModel} from '../../Model/CzvsModel';
import {CommuneService} from '../../Services/Commune/commune.service';
import {CzvsService} from '../../Services/czvs/czvs.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from "../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../assets/i18n/en.json";


@Component({
  selector: 'app-czvs',
  templateUrl: './czvs.component.html',
  styleUrls: ['./czvs.component.sass'],
  styles: ['.hide{\n' +
  '    display: none!important;\n' +
  '}\n' +
  '\n' +
  '.show{\n' +
  '    display: block;\n' +
  '}']
})
export class CZVSComponent implements OnInit, OnDestroy {


  currentLangue = localStorage.getItem("langue");


  icon = 'pe-7s-config icon-gradient bg-premium-dark';


  labelTitreFormulaire = 'Informations générales';
  labelButtonSave = 'Enregistrer';
  labelCodeCZVS = "Code CZVS";
  labelLibelleCZVSFR = "Libellé CZVS FR";
  labelLibeleCZVSEN = "Libellé CZVS EN";
  labelChampSelect = "Arrondissement"

  defaultLibelleSelect = 'Choisir...';
  labelTitreTableau = 'Liste des CZVS enregistrées';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  valeurID : number;
  valeurCodeCZVS : string = '';
  valeurLibelleCZVSFR : string = '';
  valeurLibelleCZVSEN :string = '';
  valeurArondissement : any;

  //LES VALEUR POUR LE PRELOADE
  isvisible: boolean = false;
  dataPreload: boolean = false;


  //ACCES AU ELEMENT DU DOM
  @ViewChild('f') f;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  //DELCARATION DES VARIABLE PROPRE AU RESSOURCE DU COMPOSANT
  listArrondissement: CommuneM[] = [];
  listCZVS: CzvsModel[]= [];


  //DECLARATION POUR LE PAGINATION
  LIMIT_PARGINATION = 10;
  listForPaginaition: CzvsModel[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  term;


  constructor(private serviceCommune: CommuneService,
              private serviceCZVS: CzvsService,
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

  ngOnDestroy(): void {}

  ngOnInit() {
    this.page = 1;
    this.listForPaginaition = [];
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serviceCZVS.getCZVS()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Le chargement des CZVs c'est éffectué avec succees", status : StatusNotification.SUCCESS});
        this.listForPaginaition = (<CzvsModel[]>data);
        this.listCZVS = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.listCZVS = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
        this.dataPreload = true;
      }, error => {
        this.dataPreload = true;
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des CZVs, verifier votre connection au serveur", status : StatusNotification.ERROR});
      })

    this.chargeArrondissement();
  }


  chargeArrondissement() {
    this.serviceCommune.getCommunes().subscribe(
      (reponse) => {
        this.serviceNotification.openToast({titre : "Notification", message : "Le chargement des Arrondissements c'est éffectué avec succees", status : StatusNotification.SUCCESS});
        this.listArrondissement = (<CommuneM[]>reponse);
      },
      (error) => {
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des Arrondissements, verifier votre connection au serveur", status : StatusNotification.ERROR});
        console.log(error)
      }
    )
  }


  cancelAction() {
    this.f.resetForm();
    this.labelButtonSave = 'Enregistrer';
  }

  onDeleteCZVS(id: number) {

    let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm();
    valFornotif.then((result) => {
      if (result.value) {
        this.serviceNotification.configShowNotif.showLoading.text = "Suppression En cours";
        this.serviceNotification.configShowNotif.showLoading.show = true;
        this.serviceCZVS.deleteCZVS(id).subscribe(
          (reponse)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
            this.messageEnregistrement = "suppression effectue avec success!";

            swalWithBootstrapButtons.fire(
              'Deleted!',
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


  onSaveCZVS(dataForm) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    if (this.actionFormulaire == 'Enregistrer') {
      let formatCZVS: CzvsModel = new CzvsModel();
      formatCZVS = new CzvsModel(null,
        dataForm.codeCZVS,
        dataForm.libelleCZVSFR,
        dataForm.libelleCZVSEN,
        null,
        dataForm.arrondissementID
      );
      this.serviceCZVS.saveCZVS(formatCZVS)
        .subscribe(data => {
          this.messageEnregistrement = "Enregistrement fait avec succes!!";
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.messageEnregistrement, status : StatusNotification.SUCCESS});
          this.f.resetForm();
          this.ngOnInit();
        }, error => {
          this.isvisible = false;
          this.erreurEnregistrement = 'Echec de l\'enregistrement, verifier votre connection au serveur';
          this.alertError.nativeElement.classList.remove('hide');
          this.alertError.nativeElement.classList.add('show');
          console.log(error)
        })

    }
    else if (this.actionFormulaire == 'Modifier') {

      let formatCZVSUpdate: CzvsModel = new CzvsModel();
      formatCZVSUpdate = new CzvsModel(this.valeurID,
        dataForm.codeCZVS,
        dataForm.libelleCZVSFR,
        dataForm.libelleCZVSEN,
        null,
        dataForm.arrondissementID
      );

      this.serviceCZVS.updateCZVS(formatCZVSUpdate)
        .subscribe(data => {

          this.messageEnregistrement = "Modification fait avec succes !!!!!";
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.messageEnregistrement, status : StatusNotification.SUCCESS});

          this.f.resetForm();
          this.ngOnInit();
          this.labelButtonSave = 'Enregistrer';
          this.actionFormulaire = 'Enregistrer';
        }, error => {
          this.erreurEnregistrement = "Echec de la modification, verifier avotre connection avec le serveur!";
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
          console.log(error);
        })
    }
  }

  onSelect(objFormul:CzvsModel) {

    this.f.resetForm({
      idOccurentValue : objFormul.id,
      codeCZVS : objFormul.codeCZVS,
      libelleCZVSFR : objFormul.libelleCZVSFR,
      libelleCZVSEN : objFormul.libelleCZVSEN,
      arrondissementID :  objFormul.arrondissement.id
    });

    this.valeurID = objFormul.id;
    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';

   /* this.valeurCodeCZVS = objFormul.codeCZVS;
    this.valeurLibelleCZVSFR = objFormul.libelleCZVSFR;
    this.valeurLibelleCZVSEN = objFormul.libelleCZVSEN;
    this.valeurArondissement = objFormul.arrondissement.id;*/

  }

  onChangePageRecup(dataRecup) {
    this.page = dataRecup;
    this.listCZVS = [];
    if (dataRecup == 1) {
      this.listCZVS = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.listCZVS = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listCZVS = this.listForPaginaition.slice(0, valNbre);
  }



}
