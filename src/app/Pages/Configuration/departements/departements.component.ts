import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegionM} from '../../../Model/RegionM';
import {DepartementService} from '../../../Services/Departement/departement.service';
import {RegionService} from '../../../Services/Region/region.service';
import {DepartementM} from '../../../Model/departementM';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from "../../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../../assets/i18n/en.json";

@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styles: ['.hide{\n' +
  '    display: none!important;\n' +
  '}\n' +
  '\n' +
  '.show{\n' +
  '    display: block;\n' +
  '}']
})
export class DepartementsComponent implements OnInit, OnDestroy {
  @ViewChild('f') formValues;

  currentLangue = localStorage.getItem("langue");

  icon = 'pe-7s-config icon-gradient bg-premium-dark';
  labelTitreFormulaire = 'Informations générales';
  labelButtonSave = 'Enregistrer';



  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  valeurSCodeDepartement = '';
  valeurSLibelleDepartementFR = '';
  valeurSLibelleDepartementEN = '';
  valeurSRegionDepartement = '';
  valeurRegion;

  isvisible: boolean = false;

  @ViewChild('f') f;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  departements: DepartementM[] = [];
  pageOfItems: Array<any>;
  id: number;
  model: any = {};

  listRegions: RegionM[] = [];

  LIMIT_PARGINATION = 10;
  listForPaginaition: DepartementM[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  term : string = '';


  constructor(private departementService: DepartementService,
              private route: ActivatedRoute,
              private router: Router,
              private serviceRegions: RegionService,
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
    this.departementService.getDepartements()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Le chargement des Départements c'est éffectué avec succees", status : StatusNotification.SUCCESS});
        this.listForPaginaition = (<DepartementM[]>data);
        this.departements = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.departements = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
      }, error => {
        console.log(error);
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des Départements, verifier votre connection au serveur", status : StatusNotification.ERROR});
      })
    this.chargeRegions();
  }


  chargeRegions() {
    this.serviceRegions.getRegions().subscribe(
      (reponse) => {
        this.serviceNotification.openToast({titre : "Notification", message : "Le chargement des Régions c'est éffectué avec succees", status : StatusNotification.SUCCESS});
        this.listRegions = (<RegionM[]>reponse);
      },
      (error) => {
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des Régions, verifier votre connection au serveur", status : StatusNotification.ERROR});
        console.log(error)
      }
    )
  }


  cancelAction() {
    this.f.resetForm();
    this.labelButtonSave = 'Enregistrer';
  }

  onDeleteDepartement(id: number) {

    let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm();
    valFornotif.then((result) => {
      if (result.value) {
        this.serviceNotification.configShowNotif.showLoading.text = "Suppression en cours";
        this.serviceNotification.configShowNotif.showLoading.show = true;
        this.departementService.deleteDepartement(id).subscribe(
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


  onSaveDepartement(dataForm) {

    this.serviceNotification.configShowNotif.showModalBlock = true;

    if (this.actionFormulaire == 'Enregistrer') {
      let formatDepartement: DepartementM = new DepartementM();
      formatDepartement = new DepartementM(null,
        dataForm.codeDepartement,
        dataForm.libelleDepartementFR,
        dataForm.libelleDepartementEN,
        dataForm.regionID,
      );
      this.departementService.saveDepartement(formatDepartement)
        .subscribe(data => {
          this.messageEnregistrement = 'Enregistrement fait avec succes!';
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.messageEnregistrement, status : StatusNotification.SUCCESS});
          this.f.resetForm();
          this.ngOnInit();
        }, error => {
          this.erreurEnregistrement = "Echec de l'enregistrement, verifier votre connection au serveur";
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
          console.log(error)
        })
    }
    else if (this.actionFormulaire == 'Modifier') {


     let formatDepartementModification = new DepartementM(this.id,
        dataForm.codeDepartement,
        dataForm.libelleDepartementFR,
        dataForm.libelleDepartementEN,
        dataForm.regionID);


      console.log("donnees des departement pour modification : ", formatDepartementModification);
      console.log("donnees des departement ancian donnee brut : ", dataForm);

      this.departementService.updateDepartement(this.id, formatDepartementModification)
        .subscribe(data => {
          this.messageEnregistrement = 'Modification fait avec succes !!!!!';
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

  onSelectDepartement(departements) {

    this.formValues.resetForm({
      libelleDepartementFR : departements.libelleDepartementFR,
      libelleDepartementEN : departements.libelleDepartementEN,
      codeDepartement : departements.codeDepartement,
      regionID : departements.region.id
    });

    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';
    this.valeurSLibelleDepartementFR = null;
    this.id = departements.id;


   /* this.valeurSCodeDepartement = departements.codeDepartement;
    this.valeurSLibelleDepartementFR = departements.libelleDepartementFR;
    this.valeurSLibelleDepartementEN = departements.libelleDepartementEN;
    this.valeurSRegionDepartement = departements.regionDepartement;
    this.valeurRegion = departements.region.id;*/

  }



  onChangePageRecup(dataRecup) {
    this.page = dataRecup;
    this.departements = [];
    if (dataRecup == 1) {
      this.departements = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.departements = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.departements = this.listForPaginaition.slice(0, valNbre);
  }


  ngOnDestroy(): void {}


}
