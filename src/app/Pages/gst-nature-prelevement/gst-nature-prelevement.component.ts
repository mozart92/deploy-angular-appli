import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NaturePrelevementM} from '../../Model/NaturePrelevementM';
import {NaturePrelevementService} from '../../Services/NaturePrelevement/nature-prelevement.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from "../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../assets/i18n/en.json";

@Component({
  selector: 'app-gst-nature-prelevement',
  templateUrl: './gst-nature-prelevement.component.html',
  styleUrls: ['./gst-nature-prelevement.component.sass'],
  styles: ['.hide{\n' +
  '    display: none!important;\n' +
  '}\n' +
  '\n' +
  '.show{\n' +
  '    display: block;\n' +
  '}']
})

export class GstNaturePrelevementComponent implements OnInit, OnDestroy {


  term;
  heading = 'Gestion des prélèvements';
  subheading = 'Enregistrer, modifier et supprimer les prélèvements du Cameroun. Tous les champs sont obligatoires';
  icon = 'pe-7s-config icon-gradient bg-premium-dark';


  labelTitreFormulaire = 'Informations générales';
  labelButtonSave = 'Enregistrer';
  labelCodeNaturePrelevement = "Code Nature prélèvement";
  labelLibelleNaturePrelevementFR = "Libellé nature prélèvement FR";
  labelLibeleNaturePrelevementEN = "Libellé nature prélèvement EN";

  labelTitreTableau = 'Liste des prélèvements enregistrées';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  valeurID : number;
  valeurCodeNaturePrelevement : string = '';
  valeurLibelleNaturePrelevementFR : string = '';
  valeurLibelleNaturePrelevementEN :string = '';
  valeurArondissement : any;

  //LES VALEUR POUR LE PRELOADE
  isvisible: boolean = false;
  dataPreload: boolean = false;


  //ACCES AU ELEMENT DU DOM
  @ViewChild('f') f;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  //DELCARATION DES VARIABLE PROPRE AU RESSOURCE DU COMPOSANT
  listNaturePrelevement: NaturePrelevementM[]= [];


  //DECLARATION POUR LE PAGINATION
  LIMIT_PARGINATION = 10;
  listForPaginaition: NaturePrelevementM[] = [];
  countItemAffcihe: number = 0;
  page = 1;


  constructor(private serviceNaturePrelevement: NaturePrelevementService,
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
    this.serviceNaturePrelevement.getNaturePrelevement()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.listForPaginaition = (<NaturePrelevementM[]>data);
        this.listNaturePrelevement = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.listNaturePrelevement = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
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
      })

  }

  ngOnDestroy(): void {
  }


  cancelAction() {
    this.f.resetForm();
    this.labelButtonSave = 'Enregistrer';
  }

  onDeleteNaturePrelevement(id: number) {

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
        this.serviceNaturePrelevement.deleteNaturePrelevement(id).subscribe(
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


  onSaveNaturePrelevement(dataForm) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    if (this.actionFormulaire == 'Enregistrer') {

      let formatNaturePrelevement: NaturePrelevementM = new NaturePrelevementM();

      formatNaturePrelevement = new NaturePrelevementM(null,
        dataForm.codeNaturePrelevement,
        dataForm.libelleNaturePrelevementFR,
        dataForm.libelleNaturePrelevementEN
      );

      this.isvisible = true;
      this.serviceNaturePrelevement.saveNaturePrelevement(formatNaturePrelevement)
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

      this.isvisible = true;
      let formatNaturePrelevementUpdate: NaturePrelevementM = new NaturePrelevementM();
      formatNaturePrelevementUpdate = new NaturePrelevementM(this.valeurID,
        dataForm.codeNaturePrelevement,
        dataForm.libelleNaturePrelevementFR,
        dataForm.libelleNaturePrelevementEN
      );

      this.serviceNaturePrelevement.updateNaturePrelevement(formatNaturePrelevementUpdate)
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

  onSelect(objFormul:NaturePrelevementM) {

    this.f.resetForm({
      idOccurentValue : objFormul.id,
      codeNaturePrelevement : objFormul.codeNaturePrelevement,
      libelleNaturePrelevementFR : objFormul.libelleNaturePrelevementFR,
      libelleNaturePrelevementEN : objFormul.libelleNaturePrelevementEN
    });

    this.valeurID = objFormul.id;
    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';

  /*
    this.valeurCodeNaturePrelevement = objFormul.codeNaturePrelevement;
    this.valeurLibelleNaturePrelevementFR = objFormul.libelleNaturePrelevementFR;
    this.valeurLibelleNaturePrelevementEN = objFormul.libelleNaturePrelevementEN;
*/

  }


  onChangePageRecup(dataRecup) {
    this.listNaturePrelevement = [];
    if (dataRecup == 1) {
      this.listNaturePrelevement = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.listNaturePrelevement = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listNaturePrelevement = this.listForPaginaition.slice(0, valNbre);
  }



}
