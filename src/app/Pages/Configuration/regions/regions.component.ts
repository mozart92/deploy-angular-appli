import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RegionM} from '../../../Model/RegionM';
import {RegionService} from '../../../Services/Region/region.service';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from "../../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../../assets/i18n/en.json";


@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styles: ['.hide{\n' +
  '    display: none!important;\n' +
  '}\n' +
  '\n' +
  '.show{\n' +
  '    display: block;\n' +
  '}'
  ]
})


export class RegionsComponent implements OnInit, OnDestroy {
  @ViewChild('f') formValues;
  heading = 'Gestion des régions';
  subheading = "Enregistrer et codifier les 10 régions du Cameroun. Définition de la région par défaut de visualisation des statistiques";
  icon = 'pe-7s-config icon-gradient bg-premium-dark';

  labelTitreFormulaire = 'Enregistrement des données';
  labelButtonSave = 'Enregistrer';

  isvisible: boolean = false;

  codeRegionLabel = 'Code de la région';
  codeRegionErrorMessage = 'Code de la région est invalide';
  libeleRegionLabelFR = 'Libellé région FR';
  libeleRegionFRerrorMessage = 'Libellé région FR est invalide';
  libeleRegionLabelEN = 'Libellé région EN';
  libeleRegionENerrorMessage = 'Libellé région EN est invalide';
  labelTitreTableau = 'Liste des régions enregistrées';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  valeurSCodeRegion = '';
  valeurSLibelleRegionFR = '';
  valeurSLibelleRegionEN = '';

  @ViewChild('f') f;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  regions;
  pageOfItems: Array<RegionM> = [];
  id: number;
  model: any = {};

  listRegion: RegionM[] = [];


  LIMIT_PARGINATION = 10;
  listForPaginaition: RegionM[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  term : string;


  constructor(private regionService: RegionService,
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
    this.listForPaginaition = [];
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.regionService.getRegions()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.regions = data;
        let regionInit: RegionM = new RegionM();
        const tailleArray = (<RegionM[]>data).length;
        for (let i = 0; i < tailleArray; i++) {
          regionInit = new RegionM(
            data[i].id,
            data[i].codeRegion,
            data[i].libelleRegionFR,
            data[i].libelleRegionEN,
            null,
            data[i].elementStatDefault
          );
          this.listForPaginaition.push(regionInit)
        }
        this.serviceNotification.openToast({titre : "Notification", message : "Le chargement des Régions éffectué avec succees", status : StatusNotification.SUCCESS});
        this.listRegion = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.listRegion = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
      }, error => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des Régions, vérifier votre connection au serveur", status : StatusNotification.ERROR});
        console.log(error);
      })
  }


  onDeleteUser(id: number) {

    let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm();
    valFornotif.then((result) => {
      if (result.value) {
        this.serviceNotification.configShowNotif.showLoading.text = "Suppression en cours";
        this.serviceNotification.configShowNotif.showLoading.show = true;
        this.regionService.deleteRegion(id).subscribe(
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


  onSaveRegion(dataForm) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    if (this.actionFormulaire == 'Enregistrer') {
      this.regionService.saveRegion(dataForm)
        .subscribe(data => {
          this.messageEnregistrement = "Enregistrement fait avec succes!!";
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.messageEnregistrement, status : StatusNotification.SUCCESS});
          this.f.resetForm();
          this.ngOnInit();

        }, error => {
          this.erreurEnregistrement = "Echec de l'enregistrement, verifier votre connection au serveur";
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
          console.log(error)
        });

    } else if (this.actionFormulaire == 'Modifier') {

      this.isvisible = true;
      this.regionService.updateRegion(this.id, dataForm)
        .subscribe(data => {
          this.messageEnregistrement = "Modification fait avec succes !!!!!";
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.messageEnregistrement, status : StatusNotification.SUCCESS});
          this.f.resetForm();
          this.ngOnInit();
          this.labelButtonSave = 'Enregistrer';
          this.actionFormulaire = 'Enregistrer';

        }, error => {
          this.erreurEnregistrement = "Echec de l'enregistrement, verifier votre connection au serveur";
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
          console.log(error);
        })
    }
  }

  onSelectRegion(regions) {

    this.formValues.resetForm({
      libelleRegionFR : regions.libelleRegionFR,
      libelleRegionEN : regions.libelleRegionEN,
      codeRegion : regions.codeRegion
    });

    this.id = regions.id;
    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';

  /*  this.valeurSCodeRegion = regions.codeRegion;
    this.valeurSLibelleRegionFR = regions.libelleRegionFR;
    this.valeurSLibelleRegionEN = regions.libelleRegionEN;*/

  }


  onDefineRegionAfficheFirst(nameregion) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    this.regionService.defineRegionVisuel(nameregion).subscribe(
      (reponse) => {
        this.serviceNotification.configShowNotif.showModalBlock = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Définition de la Région par defaut réussie", status : StatusNotification.SUCCESS});

        this.ngOnInit();
      },
      (error) => {
        this.isvisible = false;
        console.log(error);
        this.erreurEnregistrement = error.error.message;
        this.serviceNotification.configShowNotif.showModalBlock = false;
        this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
      }
    );
  }


  cancelAction() {
    this.labelButtonSave = 'Enregistrer';
    this.f.resetForm();
  }


  onChangePageRecup(dataRecup) {
    this.page = dataRecup;
    this.listRegion = [];
    if (dataRecup == 1) {
      this.listRegion = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.listRegion = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listRegion = this.listForPaginaition.slice(0, valNbre);
  }

  ngOnDestroy(): void {}


}








