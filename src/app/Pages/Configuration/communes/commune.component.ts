import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommuneM} from '../../../Model/CommuneM';
import {DepartementM} from '../../../Model/departementM';
import {CommuneService} from '../../../Services/Commune/commune.service';
import {DepartementService} from '../../../Services/Departement/departement.service';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from 'sweetalert2';
import {ModeProductionService} from '../../../PlatesFormes/mode-production.service';

import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from '../../../../assets/i18n/fr.json';
// @ts-ignore
import LanguageEN from '../../../../assets/i18n/en.json';

@Component({
  selector: 'app-communes',
  templateUrl: './communes.component.html',
  styles: ['.hide{\n' +
  '    display: none!important;\n' +
  '}\n' +
  '\n' +
  '.show{\n' +
  '    display: block;\n' +
  '}']
})
export class CommuneComponent implements OnInit, OnDestroy {
  @ViewChild('f') formValues;

  currentLangue = localStorage.getItem("langue");

  heading = 'Gestion des arrondissements';
  headingSyrem = 'Gestion des communes';
  subheading = '';
  icon = 'pe-7s-config icon-gradient bg-premium-dark';
  labelTitreFormulaire = 'Enregistrement des données';
  labelButtonSave = 'Enregistrer';
  isvisible: boolean = false;
  codeCommuneLabel = 'Code arrondissement';
  codeCommuneErrorMessage = 'Le Code arrondissement est invalide';
  libeleCommuneLabelFR = 'Libellé arrondissement FR';
  libeleCommuneFRerrorMessage = 'Libellé arrondissement FR est invalide';
  libeleCommuneLabelEN = 'Libellé arrondissement EN';
  libeleCommuneENerrorMessage = 'Libellé arrondissement EN est invalide';
  departementCommuneLabel = 'Département';
  departementCommuneErrorMessage = 'Département arrondissements est invalide';
  selectDepartement = 'Choisir...';
  labelTitreTableau = "Liste des arrondissements enregistrés";
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  valeurSCodeCommune;
  valeurSLibelleCommuneFR;
  valeurSLibelleCommuneEN;
  valeurSDepartementCommune;
  valeurDepartement;

  @ViewChild('alert') alert: ElementRef;
  @ViewChild('alertError') alertError;

  communes: CommuneM[] = [];
  pageOfItems: Array<any> = [];
  id: number;
  model: any = {};

  listDepartement: DepartementM[];


  LIMIT_PARGINATION = 10;
  listForPaginaition: CommuneM[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  term = '';




  constructor(private communeService: CommuneService,
              private route: ActivatedRoute,
              private router: Router,
              private serviceDepartement: DepartementService,
              public serviceNotification : NotificationsGeneralService,
              public modeApply : ModeProductionService,
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
    this.listForPaginaition = [];
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.communeService.getCommunes()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Le chargement des données éffectué avec succees", status : StatusNotification.SUCCESS});
        this.listForPaginaition = (<CommuneM[]>data);
        this.communes = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.communes = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
      }, error => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des données, vérifier votre connection au serveur", status : StatusNotification.ERROR});
        console.log(error);
      })

    this.chargeDepartement();

  }


  chargeDepartement() {
    this.serviceDepartement.getDepartements().subscribe(
      (reponse) => {
        this.serviceNotification.openToast({titre : "Notification", message : "Le chargement des Départements c'est éffectué avec succees", status : StatusNotification.SUCCESS});
        this.listDepartement = (<DepartementM[]>reponse);
      },
      (error) => {
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des Départements, verifier votre connection au serveur", status : StatusNotification.ERROR});
        console.log(error)
      }
    )
  }


  onDeleteCommune(id: number) {

    let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm();
    valFornotif.then((result) => {
      if (result.value) {
        this.serviceNotification.configShowNotif.showLoading.text = "Suppression en cours";
        this.serviceNotification.configShowNotif.showLoading.show = true;
        this.communeService.deleteCommune(id).subscribe(
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


  onSaveCommune(dataForm) {

    this.serviceNotification.configShowNotif.showModalBlock = true;

    if (this.labelButtonSave == 'Enregistrer') {
      let formatCommune: CommuneM = new CommuneM();
      formatCommune = new CommuneM(null,
        dataForm.codeCommune,
        dataForm.libelleCommuneFR,
        dataForm.libelleCommuneEN,
        dataForm.departementselect
      );
      this.isvisible = true;
      this.communeService.saveCommune(formatCommune)
        .subscribe(data => {
          this.messageEnregistrement = "Enregistrement fait avec succes!!";
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.messageEnregistrement, status : StatusNotification.SUCCESS});
          this.formValues.resetForm();
          this.ngOnInit();
        }, error => {
          this.erreurEnregistrement = "Echec de l'enregistrement, verifier votre connection au serveur";
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
          console.log(error)
        })
    }
    else if (this.labelButtonSave == 'Modifier') {
      let formatCommuneForUpdate: CommuneM = new CommuneM();
      formatCommuneForUpdate = new CommuneM(this.id,
        dataForm.codeCommune,
        dataForm.libelleCommuneFR,
        dataForm.libelleCommuneEN,
        dataForm.departementselect
      );

      this.communeService.updateCommune(this.id, formatCommuneForUpdate)
        .subscribe(data => {
          this.messageEnregistrement = "Modification fait avec succes !!!!!";
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.messageEnregistrement, status : StatusNotification.SUCCESS});
          this.formValues.resetForm();
          this.ngOnInit();
          this.labelButtonSave = 'Enregistrer';
          this.actionFormulaire = 'Enregistrer';
        }, error => {
          this.erreurEnregistrement = "Echec de la modification, verifier avotre connection avec le serveur!";
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
        })
    }

  }

  onSelectCommune(communes) {

    this.formValues.resetForm({
      libelleCommuneFR : communes.libelleCommuneFR,
      libelleCommuneEN : communes.libelleCommuneEN,
      codeCommune : communes.codeCommune,
      departementselect : communes.departement.id
    });

    this.labelButtonSave = 'Modifier';
    this.id = communes.id;

  /*  this.valeurSCodeCommune = communes.codeCommune;
    this.valeurSLibelleCommuneFR = communes.libelleCommuneFR;
    this.valeurSLibelleCommuneEN = communes.libelleCommuneEN;
    this.valeurDepartement = communes.departement.id;*/

  }

  cancelAction() {
    this.labelButtonSave = 'Enregistrer';
    this.formValues.resetForm();
  }


  onChangePageRecup(dataRecup) {
    this.communes = [];
    this.page = dataRecup;
    if (dataRecup == 1) {
      this.communes = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.communes = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.communes = this.listForPaginaition.slice(0, valNbre);
  }

  ngOnDestroy(): void {
  }


}
