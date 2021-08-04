import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {ProfilGroupPerso} from '../../../Model/ProfilGroupPerso';
import {GroupesService} from '../../../Services/groupe/groupes.service';
import {ProfilGroupService} from '../../../Services/profilGroup/profil-group.service';
import {Group} from '../../../Model/group';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";


@Component({
  selector: 'app-profils-user',
  templateUrl: './profils-user.component.html',
  styles: ['.hide{\n' +
  '    display: none!important;\n' +
  '}\n' +
  '\n' +
  '.show{\n' +
  '    display: block;\n' +
  '}']
})
export class ProfilsUserComponent implements OnInit, OnDestroy {

  heading = 'Gestion des profils utilisateurs';
  subheading = '';
  icon = 'pe-7s-users icon-gradient bg-premium-dark';

  show = false;
  isvisible: boolean = false;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;
  @ViewChild('formViewPrivil') formViewPrivil;


  labelTitreFormulaire = 'Enregistrement des données';
  labelButtonSave = 'Enregistrer';

  nomProfilLabel = 'Nom du profil';
  nomProfilErrorMessage = 'Nom du profil est invalide';
  groupeConcerneLabel = 'Groupe concerné';
  groupeConcerneerrorMessage = 'Groupe concerné est invalide';

  labelTitreTableau = 'Liste des profils enregistrés';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  dataGroup: Array<Group> = [];
  pageOfItems: Array<any>;

  listProfilGroup: ProfilGroupPerso[] = [];
  cloneInitlistProfilGroup: ProfilGroupPerso[] = [];


  constructor(private servicegrp: GroupesService,
              private serviceProfil: ProfilGroupService,
              public serviceNotification : NotificationsGeneralService) {
  }

  ngOnInit() {
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement privilèges"
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.dataGroup = this.servicegrp.getAllGroupWithformatage();
    this.chargeAllProfils();
    this.isvisible = false;
  }

  ngOnDestroy(): void {}


  chargeAllProfils() {

    this.serviceProfil.getAllProfil().subscribe(
      (response) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        let listProfilTemp: ProfilGroupPerso[] = [];
        let formatForInitProfil: ProfilGroupPerso = new ProfilGroupPerso();

        let dataProfilCaster: ProfilGroupPerso[] = (<ProfilGroupPerso[]>response);
        for (let i = 0; i < (<ProfilGroupPerso[]>response).length; i++) {
          formatForInitProfil = new ProfilGroupPerso(dataProfilCaster[i].id,
            dataProfilCaster[i].libillePage,
            dataProfilCaster[i].modulesPage,
            null,
            null);
          listProfilTemp.push(formatForInitProfil);

        }

        this.listProfilGroup = [];
        this.cloneInitlistProfilGroup = [];
        this.listProfilGroup = listProfilTemp;
        this.cloneInitlistProfilGroup = listProfilTemp;
        this.serviceNotification.openToast({
          titre : "Notification",
          message : "Chargement des priviléges réussi!!",
          status : StatusNotification.SUCCESS});

      },
      (error) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : "Notification",
          message : "Echec du chargement des priviléges, vérifier votre connection au serveur",
          status : StatusNotification.ERROR});
        console.log(error)
      }
    )
  }


  onSubmitInfosModulPage(valModul, valnamePage) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    let formatCreatePageModule: ProfilGroupPerso = new ProfilGroupPerso(null, valnamePage, valModul);
    this.serviceProfil.createPageForAccess(formatCreatePageModule).subscribe(
      (response) => {
        this.serviceNotification.configShowNotif.showModalBlock = false;
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : "Enregistrement fait avec succes!",
          status : StatusNotification.SUCCESS});
        this.ngOnInit();
      },
      (error) => {
        this.serviceNotification.configShowNotif.showModalBlock = false;
        this.serviceNotification.swalError({
          icon: StatusNotification.ERROR,
          title: "Operation échoué",
          text: "Echec de l'enregistrement"});
        console.log(error);
      }
    )
  }

  onSendPrivilage(objGrpConcerne, objItemPrivilConfig) {
    let elementTovalide = {};

    for (let item in objItemPrivilConfig) {

      switch (objItemPrivilConfig[item]) {
        case '':
          elementTovalide[item] = false;
          break;
        case true:
          elementTovalide[item] = true;
          break;
        case false:
          elementTovalide[item] = false;
          break;
        default:
          elementTovalide[item] = true;
      }

    }

    let formatsendPrivil: ProfilGroupPerso = new ProfilGroupPerso(null, null, null, objGrpConcerne, elementTovalide);
    this.serviceNotification.configShowNotif.showLoading.text = "Enregistrement En cours"
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serviceProfil.assignePrivilegeToGroup(formatsendPrivil).subscribe(
      (reponse) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : "Attrubution privilége réussi!!",
          status : StatusNotification.SUCCESS});
      },
      (error) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.messageEnregistrement = 'Echec de l\'enregistrement du Privilèges!!!';
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : this.messageEnregistrement,
          status : StatusNotification.ERROR});
        console.log(error);
      }
    )


  }

  onDeletePrivil(formDeletePrivil) {
    let elementTovalide = {};
    for (let item in formDeletePrivil) {
      if (formDeletePrivil[item] == true || formDeletePrivil[item] == false) {
        elementTovalide[item] = formDeletePrivil[item];
      } else {
        formDeletePrivil[item] = false;
      }
    }

    let formatsendPrivil: ProfilGroupPerso = new ProfilGroupPerso(null, null, null, null, elementTovalide);

    let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm({
      title: 'Etes-vous sure de vouloir supprimer ce privilége?',
      icon: StatusNotification.WARNING,
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true});
    valFornotif.then((result) => {
      if (result.value) {
        this.serviceNotification.configShowNotif.showLoading.text = "Suppression en  courss";
        this.serviceNotification.configShowNotif.showLoading.show = true;
        this.serviceProfil.deleteModulPage(formatsendPrivil).subscribe(
          (reponse)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
            this.messageEnregistrement = "suppréssion  du privilège réussi !!";

            swalWithBootstrapButtons.fire(
              'Suppression!',
              this.messageEnregistrement,
              StatusNotification.SUCCESS
            );
            this.ngOnInit();
          },
          (error)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
            console.log(error.error.codeNumber);
            this.erreurEnregistrement = "Echec de la suppression du privilége, vérifier la connection avec le serveur!";
            swalWithBootstrapButtons.fire(
              'Suppression!',
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

  onSelectMyprivilege(idGroup) {
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.isvisible = true;
    this.serviceProfil.getProfilByIdGroup(idGroup).subscribe(
      (reponse) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        let dataOnlyPrivilGroup: ProfilGroupPerso[] = [];

        let formatForChargerProfil: ProfilGroupPerso = new ProfilGroupPerso();
        let dataProfilCasterForGroup: ProfilGroupPerso[] = (<ProfilGroupPerso[]>reponse);

        if (dataProfilCasterForGroup.length > 0) {
          for (let i = 0; i < (<ProfilGroupPerso[]>reponse).length; i++) {
            let groupCast: Group = null;

            for (let itemgrounow of dataProfilCasterForGroup[i].groupes) {
              if (itemgrounow.id == idGroup) {
                groupCast = itemgrounow;
              }
            }

            formatForChargerProfil = new ProfilGroupPerso(dataProfilCasterForGroup[i].id,
              dataProfilCasterForGroup[i].libillePage,
              dataProfilCasterForGroup[i].modulesPage,
              idGroup,
              groupCast);
            dataOnlyPrivilGroup.push(formatForChargerProfil);
          }

          let tempListPrivilGroup: ProfilGroupPerso[] = [].concat(this.cloneInitlistProfilGroup);

          for (let y = 0; y < dataOnlyPrivilGroup.length; y++) {
            let indexDelete: number = tempListPrivilGroup.findIndex(element => element.libillePage == dataOnlyPrivilGroup[y].libillePage);

            if (indexDelete != null) {
              tempListPrivilGroup.splice(indexDelete, 1, dataOnlyPrivilGroup[y]);
            }
          }
          this.listProfilGroup = tempListPrivilGroup;
        } else {
          this.ngOnInit();
        }
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : "Chargement privilége réussi",
          status : StatusNotification.SUCCESS});
      },
      (error) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.erreurEnregistrement = 'Echec de chargement des Privilèges';
        this.serviceNotification.openToast({
          titre : 'Notification privilége',
          message : this.erreurEnregistrement,
          status : StatusNotification.ERROR});
        console.log(error);
      }
    )
  }


  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.alert.nativeElement.classList.add('hide');
  }

  closeAlertError() {
    this.alertError.nativeElement.classList.remove('show');
    this.alertError.nativeElement.classList.add('hide');
  }


}
