import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CzvsModel} from '../../Model/CzvsModel';
import {LaboratoiresM} from '../../Model/LaboratoiresM';
import {CzvsService} from '../../Services/czvs/czvs.service';
import {LaboratoiresService} from '../../Services/Laboratoires/laboratoires.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from '../../../assets/i18n/fr.json';
// @ts-ignore
import LanguageEN from '../../../assets/i18n/en.json';

@Component({
  selector: 'app-gst-laboratoires',
  templateUrl: './gst-laboratoires.component.html',
  styleUrls: ['./gst-laboratoires.component.sass'],
  styles: ['.hide{\n' +
  '    display: none!important;\n' +
  '}\n' +
  '\n' +
  '.show{\n' +
  '    display: block;\n' +
  '}']
})
export class GstLaboratoiresComponent implements OnInit, OnDestroy {

  currentLangue = localStorage.getItem("langue");

  term;
  heading = "Gestion des laboratoires";
  subheading = 'Enregistrer, modifier et supprimer les laboratoires du Cameroun. Tous les champs sont obligatoires';
  icon = 'pe-7s-config icon-gradient bg-premium-dark';

  labelTitreFormulaire = 'Informations générales';
  labelButtonSave = 'Enregistrer';
  labelLibelleLaboratoireFR = "Libellé laboratoire FR";
  labelLibeleLaboratoireEN = "Libellé laboratoire EN";
  labelChampSelect = "CZSV"
  labelLongitude = "Longitude";
  labelLaltitude = "Laltitude";
  labelAltitude = "Altitude";

  defaultLibelleSelect = 'Choisir...';
  labelTitreTableau = 'Liste des laboratoires enregistrées';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  valeurID : number;
  valeurLibelleLaboratoireFR : string = '';
  valeurLibelleLaboratoireEN :string = '';
  valeurCzsv : any;
  valeurLongitude : number;
  valeurLaltitude : number;
  valeurAltitude : number;

  //LES VALEUR POUR LE PRELOADE
  isvisible: boolean = false;
  dataPreload: boolean = false;


  //ACCES AU ELEMENT DU DOM
  @ViewChild('f') f;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  //DELCARATION DES VARIABLE PROPRE AU RESSOURCE DU COMPOSANT
  listCZVS: CzvsModel[] = [];
  listLaboratoire: LaboratoiresM[] = [];

  //DECLARATION POUR LE PAGINATION
  LIMIT_PARGINATION = 10;
  listForPaginaition: LaboratoiresM[] = [];
  countItemAffcihe: number = 0;
  page = 1;


  constructor(private serviceCZVS: CzvsService,
              private serviceLaboratoire: LaboratoiresService,
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
    this.serviceLaboratoire.getLaboratoire()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.listForPaginaition = (<LaboratoiresM[]>data);
        this.listLaboratoire = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.listLaboratoire = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
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
          status : StatusNotification.ERROR});
        console.log(error);
      })

    this.chargeCZVS();
  }

  ngOnDestroy(): void {
  }


  chargeCZVS() {
    this.serviceCZVS.getCZVS().subscribe(
      (reponse) => {
        this.listCZVS = (<CzvsModel[]>reponse);
      },
      (error) => {
        console.log(error)
      }
    )
  }


  cancelAction() {
    this.f.resetForm();
    this.labelButtonSave = 'Enregistrer';
  }

  onDeleteLaboratoire(id: number) {

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
        this.serviceLaboratoire.deleteLaboratoire(id).subscribe(
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


  onSaveLaboratoire(dataForm) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    if (this.actionFormulaire == 'Enregistrer') {

      let formatLaboratoire: LaboratoiresM = new LaboratoiresM();

      formatLaboratoire = new LaboratoiresM(dataForm.CZVSID,
        dataForm.libelleLaboratoireFR,
        dataForm.libelleLaboratoireEN,
        null,
        dataForm.CZVSID,
        dataForm.longitude,
        dataForm.laltitude,
        dataForm.altitude,
      );

      this.isvisible = true;
      this.serviceLaboratoire.saveLaboratoire(formatLaboratoire)
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

      let formatLaboratoireUpdate: LaboratoiresM = new LaboratoiresM();
      formatLaboratoireUpdate = new LaboratoiresM(this.valeurID,
        dataForm.libelleLaboratoireFR,
        dataForm.libelleLaboratoireEN,
        null,
        dataForm.CZVSID,
        dataForm.longitude,
        dataForm.laltitude,
        dataForm.altitude,
      );

      this.serviceLaboratoire.updateLaboratoire(dataForm.CZVSID ,formatLaboratoireUpdate)
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

  onSelect(objFormul:LaboratoiresM) {

    this.f.resetForm({
      idOccurentValue : objFormul.id,
      libelleLaboratoireFR : objFormul.libelleLaboratoireFR,
      libelleLaboratoireEN : objFormul.libelleLaboratoireEN,
      CZVSID : objFormul.czvsModel.id,
      longitude :  objFormul.longitude,
      laltitude : objFormul.laltitude,
      altitude : objFormul.altitude
    });

    this.valeurID = objFormul.id;
    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';

   /* this.valeurLibelleLaboratoireFR = objFormul.libelleLaboratoireFR;
    this.valeurLibelleLaboratoireEN = objFormul.libelleLaboratoireEN;
    this.valeurCzsv = objFormul.czvsModel.id;
    this.valeurLongitude = objFormul.longitude;
    this.valeurLaltitude = objFormul.laltitude;
    this.valeurAltitude = objFormul.altitude;*/

  }


  onChangePageRecup(dataRecup) {
    this.page = dataRecup;
    this.listLaboratoire = [];
    if (dataRecup == 1) {
      this.listLaboratoire = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.listLaboratoire = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listLaboratoire = this.listForPaginaition.slice(0, valNbre);
  }


}
