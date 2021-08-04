import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MesuresControleM} from '../../Model/MesuresControleM';
import {MesuresControleService} from '../../Services/MesuresControle/mesures-controle.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from "../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../assets/i18n/en.json";


@Component({
  selector: 'app-mesures-controle',
  templateUrl: './mesures-controle.component.html',
  styleUrls: ['./mesures-controle.component.sass'],
  styles: ['.hide{\n' +
  '    display: none!important;\n' +
  '}\n' +
  '\n' +
  '.show{\n' +
  '    display: block;\n' +
  '}']
})
export class MesuresControleComponent implements OnInit, OnDestroy {


  heading = 'Gestion des mesures de contrôle';
  subheading = 'Enregistrer, modifier et supprimer les mesures de contrôle du Cameroun. Tous les champs sont obligatoires';
  icon = 'pe-7s-config icon-gradient bg-premium-dark';


  labelTitreFormulaire = 'Informations générales';
  labelButtonSave = 'Enregistrer';
  labelCodeMesuresControle = "Code mesures de contrôle ";
  labelLibelleMesuresControleFR = "Libellé des mesures de contrôle FR";
  labelLibeleMesuresControleEN = "Libellé des mesures de contrôle EN";



  labelTitreTableau = 'Liste des mesures de contrôles enregistrées';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  valeurID : number;
  valeurCodeMesuresControle : string = '';
  valeurLibelleMesuresControleFR : string = '';
  valeurLibelleMesuresControleEN :string = '';
  valeurArondissement : any;

  //LES VALEUR POUR LE PRELOADE
  isvisible: boolean = false;
  dataPreload: boolean = false;


  //ACCES AU ELEMENT DU DOM
  @ViewChild('f') f;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  //DELCARATION DES VARIABLE PROPRE AU RESSOURCE DU COMPOSANT
  listMesuresControle: MesuresControleM[]= [];




  //DECLARATION POUR LE PAGINATION
  LIMIT_PARGINATION = 10;
  listForPaginaition: MesuresControleM[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  term : string;


  constructor(private serviceMesuresControle: MesuresControleService,
              public serviceNotification: NotificationsGeneralService,
              private translate: TranslateService) {
    if (localStorage.getItem('langue') == 'fr') {
      this.translate.setTranslation(`${localStorage.getItem('langue')}`, defaultLanguage);
      this.translate.use(`${localStorage.getItem('langue')}`);
    }
    if (localStorage.getItem('langue') == 'en') {
      this.translate.setTranslation(`${localStorage.getItem('langue')}`, LanguageEN);
      this.translate.use(`${localStorage.getItem('langue')}`);
    }

  }

  ngOnInit() {
    this.page = 1;
    this.listForPaginaition = [];
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serviceMesuresControle.getMesuresControle()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.listForPaginaition = (<MesuresControleM[]>data);
        this.listMesuresControle = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.listMesuresControle = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
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

  onDeleteMesuresControle(id: number) {



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
        this.serviceMesuresControle.deleteMesuresControle(id).subscribe(
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


  onSaveMesuresControle(dataForm) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    if (this.actionFormulaire == 'Enregistrer') {

      let formatMesuresControle: MesuresControleM = new MesuresControleM();

      formatMesuresControle = new MesuresControleM(null,
        dataForm.codeMesuresControle,
        dataForm.libelleMesuresControleFR,
        dataForm.libelleMesuresControleEN
      );

      this.isvisible = true;
      this.serviceMesuresControle.saveMesuresControle(formatMesuresControle)
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
      let formatMesuresControleUpdate: MesuresControleM = new MesuresControleM();
      formatMesuresControleUpdate = new MesuresControleM(this.valeurID,
        dataForm.codeMesuresControle,
        dataForm.libelleMesuresControleFR,
        dataForm.libelleMesuresControleEN
      );

      this.serviceMesuresControle.updateMesuresControle(formatMesuresControleUpdate)
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

  onSelect(objFormul:MesuresControleM) {

    this.f.resetForm({
      idOccurentValue : objFormul.id,
      codeMesuresControle : objFormul.codeMesuresControle,
      libelleMesuresControleFR : objFormul.libelleMesuresControleFR,
      libelleMesuresControleEN : objFormul.libelleMesuresControleEN
    });

    this.valeurID = objFormul.id;
    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';

    /*this.valeurCodeMesuresControle = objFormul.codeMesuresControle;
    this.valeurLibelleMesuresControleFR = objFormul.libelleMesuresControleFR;
    this.valeurLibelleMesuresControleEN = objFormul.libelleMesuresControleEN;*/

  }



  onChangePageRecup(dataRecup) {
    this.page = dataRecup;
    this.listMesuresControle = [];
    if (dataRecup == 1) {
      this.listMesuresControle = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.listMesuresControle = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.listMesuresControle = this.listForPaginaition.slice(0, valNbre);
  }



}
