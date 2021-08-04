import {Component, OnInit, ViewChild} from '@angular/core';
import {VillagesM} from '../../Model/VillagesM';
import {CzvsModel} from '../../Model/CzvsModel';
import {CzvsService} from '../../Services/czvs/czvs.service';
import {VillagesService} from '../../Services/Villages/villages.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from "../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../assets/i18n/en.json";


@Component({
  selector: 'app-villages',
  templateUrl: './villages.component.html',
  styleUrls: ['./villages.component.sass'],
  styles: ['.hide{\n' +
  'display: none!important;\n' +
  '}\n' +
  '\n' +
  '.show{\n' +
  '    display: block;\n' +
  '}']
})
export class VillagesComponent implements OnInit {


  currentRegion = localStorage.getItem('region')=="null" || localStorage.getItem('region')=="undefined" ? null : localStorage.getItem('region');
  currentDepartement = localStorage.getItem('departement')=="null" || localStorage.getItem('departement')=="undefined" ? null : localStorage.getItem('departement');
  currentCommune = localStorage.getItem('commune')=="null" || localStorage.getItem('commune')=="undefined" ? null : localStorage.getItem('commune');
  currentCZV = localStorage.getItem('czvUser')=="null" || localStorage.getItem('czvUser')=="undefined" ? null : localStorage.getItem('czvUser');



  currentLangue = localStorage.getItem("langue");

  heading = 'Gestion des village';
  subheading = 'Enregistrer, modifier et supprimer les villages. Tous les champs sont obligatoires';
  icon = 'pe-7s-config icon-gradient bg-premium-dark';

  labelTitreFormulaire = 'Informations générales';
  labelButtonSave = 'Enregistrer';
  labelLibelleVillageFR = 'Libellé Village FR';
  labelLibeleVillageEN = 'Libellé Village EN';
  labelChampSelect = 'CZSV'
  labelLongitude = 'Longitude';
  labelLaltitude = 'Laltitude';
  labelAltitude = 'Altitude';


  defaultLibelleSelect = 'Choisir...';
  labelTitreTableau = 'Liste des village enregistrées';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  valeurID: number;
  valeurLibelleVillageFR: string = '';
  valeurLibelleVillageEN: string = '';
  valeurCzsv: any;
  valeurLongitude: number;
  valeurLaltitude: number;
  valeurAltitude: number;

  //LES VALEUR POUR LE PRELOADE
  isvisible: boolean = false;
  dataPreload: boolean = false;


  //ACCES AU ELEMENT DU DOM
  @ViewChild('f') f;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  //DELCARATION DES VARIABLE PROPRE AU RESSOURCE DU COMPOSANT
  listCZVS: CzvsModel[] = [];
  listVillage: VillagesM[] = [];


  //DECLARATION POUR LE PAGINATION
  LIMIT_PARGINATION = 10;
  listForPaginaition: VillagesM[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  term;


  constructor(private serviceCZVS: CzvsService,
              private serviceVillage: VillagesService,
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
    this.serviceVillage.getVillage()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.filterVillagesTrie((data as VillagesM[]));
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

    this.chargeCZVS();
  }




  chargeCZVS() {
    this.serviceCZVS.getCZVS().subscribe(
      (reponse) => {
        this.filterCzvTrie((<CzvsModel[]>reponse));
      },
      (error) => {
        console.log(error)
      }
    )
  }

  filterCzvTrie(itemsCzvs : CzvsModel[]){
    if (this.currentCZV != null){
        for (let itemCzv of itemsCzvs){
          if (itemCzv.libelleCZVSFR == this.currentCZV){
            this.listCZVS.push(itemCzv);
          }
        }
      return
    }
    if (this.currentCommune != null){
      for (let itemCzv of itemsCzvs){
        if (itemCzv.arrondissement.libelleCommuneFR == this.currentCommune){
          this.listCZVS.push(itemCzv);
        }
      }
      return
    }
    if (this.currentDepartement != null){
      for (let itemCzv of itemsCzvs){
        if (itemCzv.arrondissement.departement.libelleDepartementFR == this.currentDepartement){
          this.listCZVS.push(itemCzv);
        }
      }
      return
    }
    if (this.currentRegion != null){
      for (let itemCzv of itemsCzvs){
        if (itemCzv.arrondissement.departement.region.libelleRegionFR == this.currentRegion){
          this.listCZVS.push(itemCzv);
        }
      }
      return
    }
    this.listCZVS = itemsCzvs;
    console.log("tout la liste des CZV filter : ", this.listCZVS);
  }


  filterVillagesTrie(itemsVillages : VillagesM[]){
    if (this.currentCZV != null){
      for (let itemVillage of itemsVillages){
        if (itemVillage.czvsModel.libelleCZVSFR == this.currentCZV){
          this.listForPaginaition.push(itemVillage);
        }
      }
      this.listVillage = [];
      this.countItemAffcihe = this.listForPaginaition.length;
      this.listVillage = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
      this.dataPreload = true;
      this.serviceNotification.openToast({
        titre : "Notification",
        message : "Chargement des donnees réussi!!",
        status : StatusNotification.SUCCESS});
      return
    }
    if (this.currentCommune != null){
      for (let itemVillage of itemsVillages){
        if (itemVillage.czvsModel.arrondissement.libelleCommuneFR == this.currentCommune){
          this.listForPaginaition.push(itemVillage);
        }
      }
      this.listVillage = [];
      this.countItemAffcihe = this.listForPaginaition.length;
      this.listVillage = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
      this.dataPreload = true;
      this.serviceNotification.openToast({
        titre : "Notification",
        message : "Chargement des donnees réussi!!",
        status : StatusNotification.SUCCESS});
      return
    }
    if (this.currentDepartement != null){
      for (let itemVillage of itemsVillages){
        if (itemVillage.czvsModel.arrondissement.departement.libelleDepartementFR == this.currentDepartement){
          this.listForPaginaition.push(itemVillage);
        }
      }
      this.listVillage = [];
      this.countItemAffcihe = this.listForPaginaition.length;
      this.listVillage = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
      this.dataPreload = true;
      this.serviceNotification.openToast({
        titre : "Notification",
        message : "Chargement des donnees réussi!!",
        status : StatusNotification.SUCCESS});
      return
    }
    if (this.currentRegion != null){
      for (let itemVillage of itemsVillages){
        if (itemVillage.czvsModel.arrondissement.departement.region.libelleRegionFR == this.currentRegion){
          this.listForPaginaition.push(itemVillage);
        }
      }
      this.listVillage = [];
      this.countItemAffcihe = this.listForPaginaition.length;
      this.listVillage = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
      this.dataPreload = true;
      this.serviceNotification.openToast({
        titre : "Notification",
        message : "Chargement des donnees réussi!!",
        status : StatusNotification.SUCCESS});
      return
    }
    this.listForPaginaition = itemsVillages;
    this.listVillage = [];
    this.countItemAffcihe = this.listForPaginaition.length;
    this.listVillage = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    this.dataPreload = true;
    this.serviceNotification.openToast({
      titre : "Notification",
      message : "Chargement des donnees réussi!!",
      status : StatusNotification.SUCCESS});
    console.log("tout la liste des CZV filter : ", this.listVillage);
  }

  cancelAction() {
    this.f.resetForm();
    this.labelButtonSave = 'Enregistrer';
    this.actionFormulaire = 'Enregistrer';
  }

  onDeleteVillage(id: number) {

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
        this.serviceVillage.deleteVillage(id).subscribe(
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


  onSaveVillage(dataForm) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    if (this.actionFormulaire == 'Enregistrer') {
      let formatVillage: VillagesM = new VillagesM();
      formatVillage = new VillagesM(dataForm.CZVSID,
        dataForm.libelleVillageFR,
        dataForm.libelleVillageEN,
        null,
        dataForm.CZVSID,
        dataForm.longitude,
        dataForm.laltitude,
        dataForm.altitude,
      );

      this.isvisible = true;
      this.serviceVillage.saveVillage(formatVillage)
        .subscribe(data => {
          this.isvisible = false;
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
          this.isvisible = false;
          this.serviceNotification.configShowNotif.showModalBlock = false;

          if (error.error.codeNumber == 108){
            this.erreurEnregistrement = 'Ce village existe déja dans la base de données';
            this.serviceNotification.swalError({
              icon: StatusNotification.ERROR,
              title: "Echec de l'enregistrement",
              text: this.erreurEnregistrement
            });
          }

          if (error.error.codeNumber == 105){
            this.erreurEnregistrement = 'Echec de l\'enregistrement, CZV sélèctionné introuvable';
            this.serviceNotification.swalError({
              icon: StatusNotification.ERROR,
              title: "Echec de l'Opération",
              text: this.erreurEnregistrement
            });
          }
          console.log(error)
        })

    } else if (this.actionFormulaire == 'Modifier') {

      this.isvisible = true;
      let formatVillageUpdate: VillagesM = new VillagesM();
      formatVillageUpdate = new VillagesM(this.valeurID,
        dataForm.libelleVillageFR,
        dataForm.libelleVillageEN,
        null,
        dataForm.CZVSID,
        dataForm.longitude,
        dataForm.laltitude,
        dataForm.altitude,
      );

      this.serviceVillage.updateVillage(dataForm.CZVSID, formatVillageUpdate)
        .subscribe(data => {

          this.isvisible = false;
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
          if (error.error.codeNumber == 108){
            this.erreurEnregistrement = 'Ce village existe déja dans la base de données';
            this.serviceNotification.swalError({
              icon: StatusNotification.ERROR,
              title: "Echec de l'enregistrement",
              text: this.erreurEnregistrement
            });
          }
          if (error.error.codeNumber == 105){
            this.erreurEnregistrement = 'Echec de l\'enregistrement, les sélèctionnés CZV ou village sont introuvables';
            this.serviceNotification.swalError({
              icon: StatusNotification.ERROR,
              title: "Echec de l'Opération",
              text: this.erreurEnregistrement
            });
          }
          console.log(error);
        })
    }

  }

  onSelect(objFormul: VillagesM) {

    this.f.resetForm({
      idOccurentValue : objFormul.id,
      libelleVillageFR : objFormul.libelleVillageFR,
      libelleVillageEN : objFormul.libelleVillageEN,
      CZVSID : objFormul.czvsModel.id,
      longitude :  objFormul.longitude,
      laltitude : objFormul.laltitude,
      altitude : objFormul.altitude
    });


    this.valeurID = objFormul.id;
    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';
  }



  onChangePageRecup(dataRecup) {
    this.page = dataRecup;
    this.listVillage = [];
    if (dataRecup == 1) {
      this.listVillage = this.listForPaginaition.slice(0, 10);
    } else {
      this.listVillage = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (10 * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listVillage = this.listForPaginaition.slice(0, valNbre);
  }


}
