import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {Group} from '../../../Model/group';
import {GroupesService} from '../../../Services/groupe/groupes.service';
import {Utilisateurs} from '../../../Model/utilisateurs';
//import * as $ from 'jquery';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
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
  selector: 'app-groupe-user',
  templateUrl: './groupe-user.component.html',
  styleUrls: ['groupe-user.component.css']
})
export class GroupeUserComponent implements OnInit, OnDestroy {

  currentLangue = localStorage.getItem("langue");

  heading = 'Groupes utilisateurs';
  subheading = '';
  icon = 'pe-7s-users icon-gradient bg-premium-dark';
  groupe: Group;
  listGroup: Array<Group> = [];
  listGroupForPaginaition: Group[] = [];
  isvisible: boolean = false;

  term : string;

  @ViewChild('formgroup') formgroup;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;


  valid: boolean = false;
  labelTitreFormulaire = 'Enregistrement des données';
  labelButtonSave = 'Enregistrer';
  titrePathAction = 'Enregistrement';
  labelTitreTableau = 'Liste des régions enregistrés';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement éffectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';


  valeurLibeleGroup;
  valeurAbreviation;
  valeurDescriptGroup;
  valeurTypeGroup;
  valeurId;

  pageOfItems: Array<any>;

  page = 1;
  countItemAffcihe: number = 0;
  LIMIT_PARGINATION = 10;

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


  constructor(private servicegrp: GroupesService,
              private fb: FormBuilder,
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
    this.listGroupForPaginaition = [];
    this.repechGroupAppMultiple = [];
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement groupes";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.servicegrp.getAllGroup().subscribe(
      (response) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        const tailleArray = (<Group[]>response).length;
        for (let i = 0; i < tailleArray; i++) {
         let formaGroupeInit : Group = new Group(
            response[i].id,
            response[i].libelleGroupe,
            response[i].abreviation,
            response[i].description,
            response[i].groupesLie,
            response[i].typeGroupes
          );
          this.listGroupForPaginaition.push(formaGroupeInit);
          this.repechGroupAppMultiple.push({'id':response[i].id, 'libelleGroupe':response[i].libelleGroupe});
        }

        this.listGroup = [];
        this.countItemAffcihe = this.listGroupForPaginaition.length;
        this.listGroup = this.listGroupForPaginaition.slice(0, this.LIMIT_PARGINATION);
        this.serviceNotification.openToast({
          titre : "Notification groupe utilisateur",
          message : "Chargement des groupes utilisateurs réussi!!",
          status : StatusNotification.SUCCESS});
      },
      (error) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : "Notification groupe utilisateur",
          message : "Echec chargement des groupes utilisateurs!!",
          status : StatusNotification.ERROR});
      }
    );


  }

  ngOnDestroy(): void {}

  onSelectGroup(formgroup: Group) {


    this.onGroupApp();


    this.formgroup.resetForm({
      idGroupe : formgroup.id,
      libele : formgroup.libelleGroupe,
      abreviation : formgroup.abreviation,
      description : formgroup.description,
      typegroup :  formgroup.typGroup
    });

    this.valeurId = formgroup.id;

   /*
    this.valeurLibeleGroup = formgroup.libelleGroupe;
    this.valeurAbreviation = formgroup.abreviation;
    this.valeurDescriptGroup = formgroup.description;
    this.valeurTypeGroup = formgroup.typGroup;*/

    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';

     let tabIdGroupAppSelectMultipl : Group[] =  (formgroup.grpAppartenent as Group[]);
     let initModifGroupApp : TypeGroupApp[] = [];
    for (let i = 0; i < tabIdGroupAppSelectMultipl.length; i++){
      initModifGroupApp.push({'id':tabIdGroupAppSelectMultipl[i].id, 'libelleGroupe':tabIdGroupAppSelectMultipl[i].libelleGroupe})
    }
    this.myForm.get('groupApp').setValue(initModifGroupApp);

  }


  onDeleteGroup(id: number) {

    let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm({
      title: 'Etes-vous sûre de vouloir supprimer ce groupe?',
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
        this.servicegrp.deleteGroup(id).subscribe(
          (reponse)=>{
            this.serviceNotification.configShowNotif.showLoading.show = false;
            this.messageEnregistrement = "suppression éffectue avec success!";

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
            this.erreurEnregistrement = "Echec de la suppression, vérifier la connection au serveur!";
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


  onSaveGroup(formgroup: NgForm) {

    this.serviceNotification.configShowNotif.showModalBlock = true;
    if (this.actionFormulaire == 'Enregistrer') {

      let formatGroupeSave : Group = new Group(0, formgroup.value.libele,
        formgroup.value.abreviation,
        formgroup.value.description,
        this.tabIdGroupAppSelectMultipl,
        formgroup.value.typegroup);
      this.isvisible = true;
      this.servicegrp.addGroups(formatGroupeSave).subscribe(
        (reponse) => {
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.messageEnregistrement = 'Enregistrement du groupe éffectué avec succés!!';
          this.serviceNotification.swalSuccess({
            icon: StatusNotification.SUCCESS,
            title: this.messageEnregistrement,
            showConfirmButton: true
          });

          this.formgroup.resetForm();
          this.myForm.get('groupApp').setValue([]);
          this.ngOnInit();
        },
        (error) => {
          console.log(error)
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.erreurEnregistrement = 'Echec de l\'enregistrement, verifier votre connection au serveur';
          this.serviceNotification.swalError({
            icon: StatusNotification.ERROR,
            title: "Echec de l'Opération ",
            text: this.erreurEnregistrement,
          });
        }
      );

    } else if (this.actionFormulaire == 'Modifier') {
     let formatGroupeUpdate : Group = new Group(this.valeurId,
        formgroup.value.libele,
        formgroup.value.abreviation,
        formgroup.value.description,
       this.tabIdGroupAppSelectMultipl,
        formgroup.value.typegroup
      );
      this.servicegrp.updateGroup(formatGroupeUpdate)
        .subscribe(
          (response) => {
            this.serviceNotification.configShowNotif.showModalBlock = false;
            this.messageEnregistrement = 'Modification du groupe éffectué avec succés !!!!!';

            this.serviceNotification.swalSuccess({
              icon: StatusNotification.SUCCESS,
              title: this.messageEnregistrement,
              showConfirmButton: true
            });

            this.formgroup.resetForm();
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
              title: "Echec de l'Opération ",
              text: this.erreurEnregistrement,
            });
            console.log(error);
          }
        )
    }

  }

  cancelAction() {
    this.labelButtonSave = 'Enregistrer';
    this.formgroup.resetForm();
    this.myForm.get('groupApp').setValue([]);
  }


  onChangePageRecup(dataRecup) {
    this.listGroup = [];
    if (dataRecup == 1) {
      this.listGroup = this.listGroupForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.listGroup = this.listGroupForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listGroup = this.listGroupForPaginaition.slice(0, valNbre);
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
