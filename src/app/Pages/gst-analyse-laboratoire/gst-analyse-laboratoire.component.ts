import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyseLaboratoireM} from '../../Model/AnalyseLaboratoireM';
import {AnalyseLaboratoireService} from '../../Services/AnalyseLaboratoire/analyse-laboratoire.service';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from '../../../assets/i18n/fr.json';
// @ts-ignore
import LanguageEN from '../../../assets/i18n/en.json';

@Component({
  selector: 'app-gst-analyse-laboratoire',
  templateUrl: './gst-analyse-laboratoire.component.html',
  styleUrls: ['./gst-analyse-laboratoire.component.sass'],
  styles: ['.hide{\n' +
  '    display: none!important;\n' +
  '}\n' +
  '\n' +
  '.show{\n' +
  '    display: block;\n' +
  '}']
})
export class GstAnalyseLaboratoireComponent implements OnInit, OnDestroy {

  heading = 'Gestion des analyses de laboratoire';
  subheading = 'Enregistrer, modifier et supprimer les analyses de laboratoire du Cameroun. Tous les champs sont obligatoires';
  icon = 'pe-7s-config icon-gradient bg-premium-dark';

  labelTitreFormulaire = 'Informations générales';
  labelButtonSave = 'Enregistrer';
  labelCodeAnalyseLaboratoire = "Code AnalyseLaboratoire";
  labelLibelleAnalyseLaboratoireFR = "Libellé analyse de laboratoire  FR";
  labelLibeleAnalyseLaboratoireEN = "Libellé analyse de laboratoire  EN";

  labelTitreTableau = 'Liste des analyses de laboratoire enregistrées';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  valeurID : number;
  valeurCodeAnalyseLaboratoire : string = '';
  valeurLibelleAnalyseLaboratoireFR : string = '';
  valeurLibelleAnalyseLaboratoireEN :string = '';
  valeurArondissement : any;

  //LES VALEUR POUR LE PRELOADE
  isvisible: boolean = false;
  dataPreload: boolean = false;

  //ACCES AU ELEMENT DU DOM
  @ViewChild('f') f;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  //DELCARATION DES VARIABLE PROPRE AU RESSOURCE DU COMPOSANT
  listAnalyseLaboratoire: AnalyseLaboratoireM[]= [];

  //DECLARATION POUR LE PAGINATION
  LIMIT_PARGINATION = 10;
  listForPaginaition: AnalyseLaboratoireM[] = [];
  countItemAffcihe: number = 0;
  page = 1;
  term;


  constructor(private serviceAnalyseLaboratoire: AnalyseLaboratoireService,
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
    this.page = 1 ;
    this.listForPaginaition = [];
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serviceAnalyseLaboratoire.getAnalyseLaboratoire()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.listForPaginaition = (<AnalyseLaboratoireM[]>data);
        this.listAnalyseLaboratoire = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.listAnalyseLaboratoire = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
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
      });
  }

  ngOnDestroy(): void {
  }


  cancelAction() {
    this.f.resetForm();
    this.labelButtonSave = 'Enregistrer';
  }

  onDeleteAnalyseLaboratoire(id: number) {

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
        this.serviceNotification.configShowNotif.showLoading.text = "Suppression En cours";
        this.serviceNotification.configShowNotif.showLoading.show = true;
        this.serviceAnalyseLaboratoire.deleteAnalyseLaboratoire(id).subscribe(
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


  onSaveAnalyseLaboratoire(dataForm) {

    this.serviceNotification.configShowNotif.showModalBlock = true;
    if (this.actionFormulaire == 'Enregistrer') {

      let formatAnalyseLaboratoire: AnalyseLaboratoireM = new AnalyseLaboratoireM();

      formatAnalyseLaboratoire = new AnalyseLaboratoireM(null,
        dataForm.codeAnalyseLaboratoire,
        dataForm.libelleAnalyseLaboratoireFR,
        dataForm.libelleAnalyseLaboratoireEN
      );

      this.serviceAnalyseLaboratoire.saveAnalyseLaboratoire(formatAnalyseLaboratoire)
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

      let formatAnalyseLaboratoireUpdate: AnalyseLaboratoireM = new AnalyseLaboratoireM();
      formatAnalyseLaboratoireUpdate = new AnalyseLaboratoireM(this.valeurID,
        dataForm.codeAnalyseLaboratoire,
        dataForm.libelleAnalyseLaboratoireFR,
        dataForm.libelleAnalyseLaboratoireEN
      );

      this.serviceAnalyseLaboratoire.updateAnalyseLaboratoire(formatAnalyseLaboratoireUpdate)
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

  onSelect(objFormul:AnalyseLaboratoireM) {

    this.f.resetForm({
      idOccurentValue : objFormul.id,
      codeAnalyseLaboratoire : objFormul.codeAnalyseLaboratoire,
      libelleAnalyseLaboratoireFR : objFormul.libelleAnalyseLaboratoireFR,
      libelleAnalyseLaboratoireEN : objFormul.libelleAnalyseLaboratoireEN
    });

    this.valeurID = objFormul.id;
    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';


    /*this.valeurCodeAnalyseLaboratoire = objFormul.codeAnalyseLaboratoire;
    this.valeurLibelleAnalyseLaboratoireFR = objFormul.libelleAnalyseLaboratoireFR;
    this.valeurLibelleAnalyseLaboratoireEN = objFormul.libelleAnalyseLaboratoireEN;
*/

  }


  onChangePageRecup(dataRecup) {
    this.page = dataRecup;
    this.listAnalyseLaboratoire = [];
    if (dataRecup == 1) {
      this.listAnalyseLaboratoire = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.listAnalyseLaboratoire = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listAnalyseLaboratoire = this.listForPaginaition.slice(0, valNbre);
  }

}
