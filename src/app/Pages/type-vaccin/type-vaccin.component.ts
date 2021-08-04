import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TypeVaccinM} from '../../Model/TypeVaccinM';
import {TypeVaccinService} from '../../Services/TypeVaccin/type-vaccin.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from "../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../assets/i18n/en.json";


@Component({
  selector: 'app-type-vaccin',
  templateUrl: './type-vaccin.component.html',
  styleUrls: ['./type-vaccin.component.sass'],
  styles: ['.hide{\n' +
  '    display: none!important;\n' +
  '}\n' +
  '\n' +
  '.show{\n' +
  '    display: block;\n' +
  '}']
})
export class TypeVaccinComponent implements OnInit, OnDestroy {


  heading = 'Gestion des types de vaccins';
  subheading = 'Enregistrer, modifier et supprimer les types de vaccins du Cameroun. Tous les champs sont obligatoires';
  icon = 'pe-7s-config icon-gradient bg-premium-dark';


  labelTitreFormulaire = 'Informations générales';
  labelButtonSave = 'Enregistrer';
  labelCodeTypeVaccin = "Code type vaccin";
  labelLibelleTypeVaccinFR = "Libellé type vaccin FR";
  labelLibeleTypeVaccinEN = "Libellé type vaccin EN";

  term : string;

  labelTitreTableau = 'Liste des types de vaccins enregistrées';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  valeurID : number;
  valeurCodeTypeVaccin : string = '';
  valeurLibelleTypeVaccinFR : string = '';
  valeurLibelleTypeVaccinEN :string = '';
  valeurArondissement : any;

  //LES VALEUR POUR LE PRELOADE
  isvisible: boolean = false;
  dataPreload: boolean = false;


  //ACCES AU ELEMENT DU DOM
  @ViewChild('f') f;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  //DELCARATION DES VARIABLE PROPRE AU RESSOURCE DU COMPOSANT
  listTypeVaccin: TypeVaccinM[]= [];




  //DECLARATION POUR LE PAGINATION
  LIMIT_PARGINATION = 10;
  listForPaginaition: TypeVaccinM[] = [];
  countItemAffcihe: number = 0;
  page = 1;


  constructor(private serviceTypeVaccin: TypeVaccinService,
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
    this.serviceTypeVaccin.getTypeVaccin()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.listForPaginaition = (<TypeVaccinM[]>data);
        this.listTypeVaccin = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.listTypeVaccin = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
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

  onDeleteTypeVaccin(id: number) {

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
        this.serviceTypeVaccin.deleteTypeVaccin(id).subscribe(
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


  onSaveTypeVaccin(dataForm) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    if (this.actionFormulaire == 'Enregistrer') {

      let formatTypeVaccin: TypeVaccinM = new TypeVaccinM();

      formatTypeVaccin = new TypeVaccinM(null,
        dataForm.codeTypeVaccin,
        dataForm.libelleTypeVaccinFR,
        dataForm.libelleTypeVaccinEN
      );

      this.serviceTypeVaccin.saveTypeVaccin(formatTypeVaccin)
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

      let formatTypeVaccinUpdate: TypeVaccinM = new TypeVaccinM();
      formatTypeVaccinUpdate = new TypeVaccinM(this.valeurID,
        dataForm.codeTypeVaccin,
        dataForm.libelleTypeVaccinFR,
        dataForm.libelleTypeVaccinEN
      );

      this.serviceTypeVaccin.updateTypeVaccin(formatTypeVaccinUpdate)
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

  onSelect(objFormul:TypeVaccinM) {

    this.f.resetForm({
      idOccurentValue : objFormul.id,
      codeTypeVaccin : objFormul.codeTypeVaccin,
      libelleTypeVaccinFR : objFormul.libelleTypeVaccinFR,
      libelleTypeVaccinEN : objFormul.libelleTypeVaccinEN
    });

    this.valeurID = objFormul.id;
    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';

   /* this.valeurCodeTypeVaccin = objFormul.codeTypeVaccin;
    this.valeurLibelleTypeVaccinFR = objFormul.libelleTypeVaccinFR;
    this.valeurLibelleTypeVaccinEN = objFormul.libelleTypeVaccinEN;*/

  }



  onChangePageRecup(dataRecup) {
    this.page = dataRecup;
    this.listTypeVaccin = [];
    if (dataRecup == 1) {
      this.listTypeVaccin = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.listTypeVaccin = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listTypeVaccin = this.listForPaginaition.slice(0, valNbre);
  }



}
