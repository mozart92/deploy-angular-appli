import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Group} from '../../../Model/group';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {Utilisateurs} from '../../../Model/utilisateurs';
import {DepartementM} from '../../../Model/departementM';
import {RegionM} from '../../../Model/RegionM';
import {CommuneM} from '../../../Model/CommuneM';
import {UsersService} from '../../../Services/utilisateurs/users.service';
import {GroupesService} from '../../../Services/groupe/groupes.service';
import {RegionService} from '../../../Services/Region/region.service';
import {DepartementService} from '../../../Services/Departement/departement.service';
import {CommuneService} from '../../../Services/Commune/commune.service';
import {CzvsModel} from '../../../Model/CzvsModel';
import {CzvsService} from '../../../Services/czvs/czvs.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {ModeProductionService} from '../../../PlatesFormes/mode-production.service';
import {element} from 'protractor';
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from "../../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../../assets/i18n/en.json";


interface TypeGroupApp {
  id;
  libelleGroupe;
}



@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['new-user.component.css']
})
export class NewUserComponent implements OnInit, OnDestroy {

  heading = 'Gestion des utilisateurs';
  subheading = '';
  icon = 'pe-7s-users icon-gradient bg-premium-dark';

  userDataSend: Utilisateurs;
  listUsers: Array<any> = [];

  @ViewChild('formuser') formuser;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;
  @ViewChild('alertWarning') alertWarning;


  nameAlert = 'danger'
  labelTitreFormulaire = 'Enregistrement des données';
  labelButtonSave = 'Enregistrer';
  labelTitreTableau = 'Liste des régions enregistrés';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';
  warningEnregistrement;
  isvisible: boolean = false;

  valeurId;
  valeurNomPrenom = '';
  valeurTel = '';
  valeurEmail = '';
  valeursexe = '';
  valeurIdentifiant = '';
  valeurPassword = '';
  valeurActif = '';
  valeurSuppHigth;
  valeurSuppHigthContenu;
  valeurDepartement;
  valeurFonction;
  valeurFunctionHeigth;
  groupsAppUser: Group[] = [];
  valeurDepartementID;
  valeurFonctionID;

  dataGroup: Array<Group> = [];


  valuess;

  pageOfItems: Array<any>;


  LIMIT_PARGINATION = 10;
  listForPaginaition: Utilisateurs[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  term;


  listDepartement: DepartementM[];
  listRegions: RegionM[];
  listCommunes: CommuneM[];
  listCZV: CzvsModel[];
  listCZVFinal: CzvsModel[];

  valeurRegionUpdate = '';
  valeurRegion = '';
  valeurCommune = '';
  valeurCommuneUpdate = '';
  valeurCZVUpdate = '';
  valeurCZV = '';
  valeurDepartementGeo = '';
  valeurDepartementGeoUpdate = '';


  myForm: FormGroup = this.fb.group({
    groupApp: []
  });

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    defaultOpen: false,
    idField: 'id',
    textField: 'libelleGroupe',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: true,
    itemsShowLimit: 4,
    allowSearchFilter: true
  };

  groupApp: Array<TypeGroupApp> = [];

  selectGroupAppMultiple : TypeGroupApp[] = [];
  repechGroupAppMultiple : TypeGroupApp[] = [];
  tabIdGroupAppSelectMultipl : any[] = [];


  constructor(private serviceUser: UsersService,
              private servicegrp: GroupesService,
              private serviceRegion: RegionService,
              private serviceDepartement: DepartementService,
              private serviceCommune: CommuneService,
              private serviceCZV : CzvsService,
              private fb: FormBuilder,
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
    this.getAllGrroups();
    this.page = 1;
    this.listForPaginaition = [];
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serviceUser.getAllUsers().subscribe(
      (response) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        const tailleArray = (<Utilisateurs[]>response).length;
        for (let i = 0; i < tailleArray; i++) {
          this.userDataSend = new Utilisateurs(
            response[i].id,
            response[i].nomPrenom,
            response[i].tel,
            response[i].email,
            response[i].sexe,
            response[i].identifiant,
            response[i].password,
            response[i].actif,
            response[i].funcHierachique,
            response[i].suppHierachique,
            response[i].groupes,
            response[i].regionUser,
            response[i].departementUser,
            response[i].communeUser,
            response[i].czvUser,
          );

          this.listForPaginaition.push(this.userDataSend);
        }
        this.listUsers = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.listUsers = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
        this.serviceNotification.openToast({
            titre : "Notification",
            message : "Chargement des utilisateurs réussis!!",
            status : StatusNotification.SUCCESS});
      },
      (error) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : "Notification",
          message : "Echec du chargement des utilisateurs, vérifier votre connection au serveur",
          status : StatusNotification.ERROR});
        console.log(error)
      }
    );

    this.chargeRegions();
    this.chargeCZV();
  }

  ngOnDestroy(): void {}


  onLoading() {this.ngOnInit();}


  getAllGrroups(){
    const donneeGroup: Array<Group> = [];
    this.dataGroup = []
    this.repechGroupAppMultiple = [];
    this.servicegrp.getAllGrroupsForService().subscribe(
      (response)=>{
        const tailleGroupInit = (<Group[]>response);
        for ( let y=0; y<tailleGroupInit.length;y++ ){

          if (tailleGroupInit[y].typeGroupes=='Fonction' || tailleGroupInit[y].typeGroupes=='Groupe de travail'){
            this.repechGroupAppMultiple.push({'id':tailleGroupInit[y].id, 'libelleGroupe':tailleGroupInit[y].libelleGroupe});
          }else {
            let formatGroupeInit = new Group(
              tailleGroupInit[y].id,
              // @ts-ignore
              tailleGroupInit[y].libelleGroupe,
              tailleGroupInit[y].abreviation,
              tailleGroupInit[y].description,
              // @ts-ignore
              tailleGroupInit[y].groupesLie,
              tailleGroupInit[y].typeGroupes);
            this.dataGroup.push(formatGroupeInit);
          }
        }
      } ,
      (error)=>{
        console.log(error);
      }
    );

  }


  chargeCZV(){
    this.serviceCZV.getCZVS().subscribe(
        (responce)=>{
          this.listCZV = (<CzvsModel[]>responce);
        },
        (error)=>{
          console.log(error)
        }
    )
  }


  chargeRegions() {
    this.serviceRegion.getRegions().subscribe(
      (reponse) => {
        this.listRegions = (<RegionM[]>reponse);
        this.serviceNotification.openToast({
          titre : "Notification ",
          message : "Chargement des Régions réussis!!",
          status : StatusNotification.SUCCESS});
      },
      (error) => {
        this.serviceNotification.openToast({
          titre : "Notification ",
          message : "Echec du chargement des Régions",
          status : StatusNotification.ERROR});
        console.log(error)
      }
    )
  }

  chooseDepartemen(idRegions) {
    this.valeurRegion = this.listRegions.find(element => element.id == idRegions).libelleRegionFR;
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement des départements";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serviceRegion.getAllDepartementByIdRegion(idRegions).subscribe(
      (reponse) => {
        this.listDepartement = (<DepartementM[]>reponse);
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : "Notification",
          message : "Chargement des département de la région : "+this.valeurRegion +" terminée!!!",
          status : StatusNotification.SUCCESS});
      },
      (error) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : "Notification utilisateurs ",
          message : "Echec du chargement des département de la région : "+this.valeurRegion,
          status : StatusNotification.ERROR});
        console.log(error)
      }
    )
  }

  chooseCommune(idDepartement) {
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement des arrondissements";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.valeurDepartementGeo = this.listDepartement.find(element => element.id == idDepartement).libelleDepartementFR;
    this.serviceDepartement.getAllCommuneByIdDepartement(idDepartement).subscribe(
      (reponse) => {
        this.listCommunes = (<CommuneM[]>reponse);
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : "Notification",
          message : "Chargement des arrondissements du département : "+this.valeurDepartementGeo +" terminée!!!",
          status : StatusNotification.SUCCESS});
      },
      (error) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : "Notification",
          message : "Echec du chargement des arrondissements du département : "+this.valeurDepartementGeo,
          status : StatusNotification.ERROR});
        console.log(error)
      }
    )
  }

  checkValueCommune(idCommune){
    this.valeurCommune = this.listCommunes.find(element => element.id == idCommune).libelleCommuneFR;
    let tabCzv: CzvsModel[] = [];
    for (let itemCsv of this.listCZV){
      if (itemCsv.arrondissement.id==idCommune){
        tabCzv.push(itemCsv);
      }
    }
    this.listCZVFinal = tabCzv;
  }

  checkValueobjCZV(idCZV){
    this.valeurCZV = this.listCZV.find(element => element.id == idCZV).libelleCZVSFR;
  }


  onSelectUser(formuser) {

  this.onGroupApp();


  this.formuser.resetForm({
    idUser : formuser.id,
    identifiant : formuser.identifiant,
    email : formuser.email,
    tel : formuser.tel,
    nomprenom :  formuser.nomPrenom,
    sexe : formuser.sexe,
    actif : formuser.actif,
    nameSupp : formuser.suppHierachique,
    region : formuser.regionUser,
    departement : formuser.departementUser,
    Commune : formuser.communeUser,
    czv : formuser.czvUser,
    departments : formuser.appartenanceGroup.find(element => element.typeGroupes == "Unité organisationnelle").id,
    funcSupp : formuser.funcHierachique
  });


   /* this.valeurId = formuser.id;
    this.valeurPassword = formuser.password;
    this.valeurIdentifiant = formuser.identifiant;
    this.valeurEmail = formuser.email;
    this.valeurTel = formuser.tel;
    this.valeurNomPrenom = formuser.nomPrenom;
    this.valeursexe = formuser.sexe;
    this.valeurActif = formuser.actif;
    this.valeurFunctionHeigth = formuser.funcHierachique;

    this.valeurSuppHigthContenu = formuser.suppHierachique;
    this.groupsAppUser = formuser.appartenanceGroup;*/

    this.valeurSuppHigth = formuser.suppHierachique;

    let tabIdGroupAppSelectMultipl : Group[] =  (formuser.appartenanceGroup as Group[]);
    let initModifGroupApp : TypeGroupApp[] = [];
    for (let i = 0; i < tabIdGroupAppSelectMultipl.length; i++){
      if (tabIdGroupAppSelectMultipl[i].typeGroupes=='Fonction' || tabIdGroupAppSelectMultipl[i].typeGroupes=='Groupe de travail'){
        initModifGroupApp.push({'id':tabIdGroupAppSelectMultipl[i].id, 'libelleGroupe':tabIdGroupAppSelectMultipl[i].libelleGroupe})
      }
    }

    this.myForm.get('groupApp').setValue(initModifGroupApp);

    this.valeurRegion = formuser.regionUser;
    this.valeurDepartementGeo = formuser.departementUser;
    this.valeurCommune = formuser.communeUser;
    this.valeurCZV = formuser.czvUser;
    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';
  }


  selectFunctionOccupe(idFunction, label?: any) {
    let valid: boolean = false;
    for (let itemgroup of this.groupsAppUser) {
      if (itemgroup.id == idFunction) {
        valid = true;
        this.valeurDepartement = label;
        this.valeurDepartementID = idFunction;
      }
    }
    return valid;
  }


  onDeleteUser(id: number) {

    let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm({
      title: 'Etes-vous sure de vouloir supprimer cet utilisateur?',
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
        this.serviceUser.deleteUser(id).subscribe(
          (reponse)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
            this.messageEnregistrement = "suppression éffectue avec success!";

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
          'Erreur'
        );
      }
    });
  }


  onSaveUser(formuser: NgForm) {

    this.serviceNotification.configShowNotif.showModalBlock = true;
    if (this.tabIdGroupAppSelectMultipl.length==0) {
      this.serviceNotification.configShowNotif.showModalBlock = false;
      this.warningEnregistrement = 'ATTENTION : veillez réselectionner les fonction occupée par cet utilisateur';
      this.serviceNotification.swalInfo({
        title: 'Alert info',
        icon: StatusNotification.WARNING,
        html: this.warningEnregistrement,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Bien reçu!',
      });
      throw new Error('les fonction de lutilisateur n\'ont pas ete prise en compte');
    }
    this.tabIdGroupAppSelectMultipl.push(formuser.value.departments);
    if (this.labelButtonSave == 'Enregistrer') {
      this.userDataSend = new Utilisateurs(
        null,
        formuser.value.nomprenom,
        formuser.value.tel,
        formuser.value.email,
        formuser.value.sexe,
        formuser.value.identifiant,
        formuser.value.password,
        formuser.value.actif,
        formuser.value.funcSupp,
        this.valeurSuppHigth,
        this.tabIdGroupAppSelectMultipl,
        formuser.value.region,
        formuser.value.departement,
        formuser.value.Commune,
        formuser.value.czv
      );

      this.serviceUser.addUser(this.userDataSend).subscribe(
        (reponse) => {
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.messageEnregistrement = 'Enregistrement fait avec succes!';
          this.valeurRegion = "";
          this.valeurDepartementGeo = "";
          this.valeurCommune = "";
          this.valeurCZV = "";
          this.listDepartement = [];
          this.listCommunes = [];
          this.listCZV = [];

          this.serviceNotification.swalSuccess({
            icon: StatusNotification.SUCCESS,
            title: "Enregistrement éffectué avec succés!!",
            showConfirmButton: true,
          });

          this.formuser.resetForm();
          this.myForm.get('groupApp').setValue([]);
          this.ngOnInit();
        },
        (error) => {
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.erreurEnregistrement = 'Echec de l\'enregistrement, verifier votre connection au serveur';
          this.serviceNotification.swalError({
            icon: StatusNotification.ERROR,
            title: "Echec de l'Opération",
            text: this.erreurEnregistrement
          });
          console.log(error)
        }
      );

    }
    else if (this.labelButtonSave == 'Modifier') {



      this.userDataSend = new Utilisateurs(
        formuser.value.idUser,
        formuser.value.nomprenom,
        formuser.value.tel,
        formuser.value.email,
        formuser.value.sexe,
        formuser.value.identifiant,
        formuser.value.password,
        formuser.value.actif,
        formuser.value.funcSupp,
        this.valeurSuppHigth,
        this.tabIdGroupAppSelectMultipl,
        this.valeurRegion,
        this.valeurDepartementGeo,
        this.valeurCommune,
        this.valeurCZV
      );


      this.serviceUser.updateUser(this.userDataSend)
        .subscribe(
          (response) => {
            this.serviceNotification.configShowNotif.showModalBlock = false;
            this.messageEnregistrement = 'Modification fait avec succes !!!!!';
            this.valeurRegion = "";
            this.valeurDepartementGeo = "";
            this.valeurCommune = "";
            this.valeurCZV = "";
            this.listDepartement = [];
            this.listCommunes = [];
            this.listCZVFinal = [];

            this.serviceNotification.swalSuccess({
              icon: StatusNotification.SUCCESS,
              title: "Modification éffectué avec succés!!",
              showConfirmButton: true,
            });

            this.formuser.resetForm();
            this.myForm.get('groupApp').setValue([]);
            this.ngOnInit();
            this.labelButtonSave = 'Enregistrer';
            this.actionFormulaire = 'Enregistrer';
          },
          (error) => {
            this.serviceNotification.configShowNotif.showModalBlock = false;
            this.erreurEnregistrement = 'Echec de la modification, verifier avotre connection avec le serveur!';
            this.serviceNotification.swalError({
              icon: StatusNotification.ERROR,
              title: "Echec de l'Opération",
              text: this.erreurEnregistrement
            });
            console.log(error);
          }
        )
    }

  }

  cancelAction() {
    this.labelButtonSave = 'Enregistrer';
    this.valeurRegion = "";
    this.valeurDepartementGeo = "";
    this.valeurCommune = "";
    this.valeurCZV = "";
    this.myForm.get('groupApp').setValue([]);
    this.formuser.reset();
  }

  onSelectectFuncHiegth(sniFuncHiegth) {
    const filter = this.persoFilter(this.listForPaginaition, sniFuncHiegth);
    if (filter != undefined) {
      this.valeurSuppHigth = filter.email;
      this.valeurSuppHigthContenu = filter.nomPrenom;
    } else {
      this.valeurSuppHigth = '';
    }


  }

  onReitialisationLocalisation(){
    this.valeurRegion = "";
    this.valeurDepartementGeo = "";
    this.valeurCommune = "";
    this.valeurCZV = "";
  }


  persoFilter(dataUser: Utilisateurs[], val: String) {

    for (let i = 0; i < dataUser.length; i++) {
      let dataGroup2: Group[] = dataUser[i].appartenanceGroup;

      for (let y = 0; y < dataGroup2.length; y++) {
        if (dataGroup2[y].libelleGroupe == val) {
          return dataUser[i];
        }
      }
    }
  }




  onChangePageRecup(dataRecup) {
    this.page = dataRecup;
    this.listUsers = [];
    if (dataRecup == 1) {
      this.listUsers = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.listUsers = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listUsers = this.listForPaginaition.slice(0, valNbre);
  }


  onItemSelect(item: any) {
    this.tabIdGroupAppSelectMultipl = [];
    this.selectGroupAppMultiple = this.myForm.get('groupApp').value;
    for (let i = 0; i < (this.myForm.get('groupApp').value as TypeGroupApp[]).length; i++){
      this.tabIdGroupAppSelectMultipl.push((this.myForm.get('groupApp').value as TypeGroupApp[])[i].id);
    }
  }


  onSelectAll(items: any) {
    this.tabIdGroupAppSelectMultipl = [];
    this.selectGroupAppMultiple = this.myForm.get('groupApp').value;
    for (let i = 0; i < (this.myForm.get('groupApp').value as TypeGroupApp[]).length; i++){
      this.tabIdGroupAppSelectMultipl.push((this.myForm.get('groupApp').value as TypeGroupApp[])[i].id);
    }
  }

  onDropDownClose() {
    this.tabIdGroupAppSelectMultipl = [];
    this.selectGroupAppMultiple = (this.myForm.get('groupApp').value as TypeGroupApp[]);
    if (this.myForm.get('groupApp').value!=null){
      for (let i = 0; i < (this.myForm.get('groupApp').value as TypeGroupApp[]).length; i++){
        this.tabIdGroupAppSelectMultipl.push((this.myForm.get('groupApp').value as TypeGroupApp[])[i].id);
      }
    }
  }

  onGroupApp(){
    this.groupApp = [];
    this.groupApp = this.repechGroupAppMultiple;
  }



}
