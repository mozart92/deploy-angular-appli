import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm, NgModel} from '@angular/forms';
import {FicheCollecteM} from '../../../Model/FicheCollecteM';
import {ElementsFicheM} from '../../../Model/ElementsFicheM';
import {FicheCollecteServicee} from '../../../Services/ficheCollecte.service';
import {ElementFicheService} from '../../../Services/elementFiche.service';
import {BaseQuestionnaireService} from '../../../Services/baseQuestionnaire.service';
import {EchangeDataService} from '../../../Services/EchangeData/echange-data.service';
import {ModeProductionService} from '../../../PlatesFormes/mode-production.service';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import Swal from "sweetalert2";

// @ts-ignore
import defaultLanguage from "../../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../../assets/i18n/en.json";
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-nouvelle-fiche',
  templateUrl: './nouvelle-fiche.component.html',
  styleUrls: ['./nouvelle-fiche.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }

    .dark-modal .close {
      color: white;
    }

    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})

export class NouvelleFicheComponent implements OnInit, OnDestroy {

  @ViewChild('f') formValues;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  isvisible: boolean = false;

  heading = 'Gestion des sections des questionnaires';
  subheading = '';

  icon = 'pe-7s-config icon-gradient bg-premium-dark';


  labelButtonSave = 'Enregistrer';
  nameProprieteChange = 'Propriete'



  selectBaseQuestionnaire = 'Choisir un type...';
  selectCadreAffichage = 'Choisir un cadre...';
  labelTitreTableau = "LISTE DES FICHES DE COLLECTES DONNEES ENREGISTRÉES";
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';

  enregistrementFichesCollectesFR = "Enregistrement des fiches de collectes";
  enregistrementFichesCollectesEN = "Enregistrement des fiches de collectes";

  labelTitreFormulaire = 'Informations générales';
  labelTitreFormulaireEN = 'Informations générales';

  annulerFR = "Annuler";
  annulerEN = "Annuler";

  nomFicheLabel = 'Nom de la fiche de collecte de données';
  nomFicheLabelEN = 'Nom de la fiche de collecte de données';

  namelabelFR = 'Label du champ (FR)';
  namelabelEN = 'Label du champ (EN)';

  insererNomFicheFR = "Insérer le nom de votre fiche";
  insererNomFicheEN = "Insérer le nom de votre fiche";

  champObligatoireVeillezRemplirFR = "champ obligatoire veuillez remplir";
  champObligatoireVeillezRemplirEN = "champ obligatoire veuillez remplir";

  lienMenuLabel = 'Lien de menu';
  lienMenuLabelEN = 'Lien de menu';

  insererLabelFR = "Insérer un label";
  insererLabelEN = "Insérer un label";

  descriptionLabel = 'Description';
  descriptionLabelEN = 'Description';

  decriverVotreFicheFR = "Décriver votre fiche";
  decriverVotreFicheEN = "Décriver votre fiche";

  baseQuestionnaireLabel = 'Base de questionnaire';
  baseQuestionnaireLabelEN = 'Base de questionnaire';

  choisirBaseQuestionnaireFR = "Choisir une base de questionnaire";
  choisirBaseQuestionnaireEN = "Choisir une base de questionnaire";

  choisirFR = "Choisir";
  choisirEN = "Choisir";

  VolailleFR = "Volaille";
  VolailleEN = "Volaille";

  poissonFR = "Poisson";
  poissonEN = "Poisson";

  mamiphereFR = "Mamiphère";
  mamiphereEN = "Mamiphère";

  abaillesFR = "Abailles";
  abaillesEN = "Abailles";

  crustacesFR = "Crustacés";
  crustacesEN = "Crustacés";

  amphibiensFR = "Amphibiens";
  amphibiensEN = "Amphibiens";

  mollusqueFR = "Mollusque";
  mollusqueEN = "Mollusque";

  lagomorpheFR = "Lagomorphe";
  lagomorpheEN = "Lagomorphe";

  suidesFR = "Suides";
  suidesEN = "Suides";




  nameAlias = 'Alias';
  valeurNomFiche = '';
  valeurLienMenu = '';
  valeurDescription = '';
  valeurNomFicheEN = '';
  valeurLienMenuEN = '';
  valeurDescriptionEN = '';
  valeurBaseQuestionnaire;
  valeurFicheCollecteID;
  valeuridFicher;


  fichecollectes;
  questionnaires: any;
  pageOfItems: Array<FicheCollecteM> = [];
  id: number;
  model: any = {};

  public elements: ElementsFicheM[] = [];

  idFicheInput: number = null;
  nomFicheInput: string = null;

  fiche: FicheCollecteM;
  contenuFiche: ElementsFicheM;

  cardreAffichage: Array<ElementsFicheM> = [];

  visibleSpinner = false;

  LIMIT_PARGINATION = 10;
  listForPaginaition: FicheCollecteM[] = [];
  countItemAffcihe: number = 0;
  page = 1;

  onTouchFile: boolean = true;

  alertModalSuccess = false;
  alertModalError = false;




  valeurChampSpecial = '';
  valeurChampSpecialEN = '';
  valeurAliaxSpecial = '';
  currentFile: FicheCollecteM = new FicheCollecteM();

  insertValeurSpecial: boolean = false;

  term = '';


  currentElementFiche: ElementsFicheM = new ElementsFicheM();


  constructor(private ficheCollecteService: FicheCollecteServicee,
              private elementFicheService: ElementFicheService,
              private baseQuestionnaireService: BaseQuestionnaireService,
              private route: ActivatedRoute,
              private router: Router,
              private passDataFiche: EchangeDataService,
              private modalService: NgbModal,
              public modeApply : ModeProductionService,
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
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    let ficheInit: FicheCollecteM = new FicheCollecteM();
    let listForPaginaitiontemp: FicheCollecteM[] = [];
    this.ficheCollecteService.getFicheCollectes()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Le chargement des fiches de collectes c'est éffectué avec succees", status : StatusNotification.SUCCESS});
        this.pageOfItems = [];
        let listfiche: FicheCollecteM[] = (<FicheCollecteM[]>data);
        const tailleArray = (<FicheCollecteM[]>data).length;
        for (let i = 0; i < tailleArray; i++) {
          ficheInit = new FicheCollecteM(
            data[i].id,
            data[i].nomFiche,
            data[i].lienMenu,
            data[i].description,
            data[i].baseQuestionnaire,
            data[i].elementsFiches,
            null,
            data[i].elementStatDefault,
            data[i].nomFicheEN,
            data[i].lienMenuEN,
            data[i].descriptionEN,
          );
          listForPaginaitiontemp.push(ficheInit);
        }

        this.listForPaginaition = [];
        this.listForPaginaition = listForPaginaitiontemp;
        this.pageOfItems = [];
        this.countItemAffcihe = this.listForPaginaition.length;
        this.pageOfItems = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
        this.passDataFiche.injectDataFichers(this.listForPaginaition);
      }, error => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des fiches de collectes, verifier votre connection au serveur", status : StatusNotification.ERROR});
        console.log(error);
      })

    this.baseQuestionnaireService.getBaseQuestionnaires()
      .subscribe(data => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Le chargement des bases de collectes c'est éffectué avec succees", status : StatusNotification.SUCCESS});
        this.questionnaires = data;

      }, err => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des base de collectes, verifier votre connection au serveur", status : StatusNotification.ERROR});
        console.log(err);
      })
  }

  ngOnDestroy(): void {}


  onLoading() {this.ngOnInit();}


  isReturn(val) {
    if (val.isreturn) {
      this.idFicheInput = null;
    }
  }

  onSaveFicheCollecte(dataForm) {

    let ficheInitSave: FicheCollecteM = new FicheCollecteM();

    ficheInitSave = new FicheCollecteM(
      null,
      dataForm.nomFiche,
      dataForm.lienMenu,
      dataForm.description,
      dataForm.baseQuestionnaireID,
      null,
      null,
      null,
      dataForm.nomFicheEN,
      dataForm.lienMenuEN,
      dataForm.descriptionEN
    );
    this.serviceNotification.configShowNotif.showModalBlock = true;
    if (this.actionFormulaire == 'Enregistrer') {

      this.ficheCollecteService.saveFicheCollecte(ficheInitSave)
        .subscribe(data => {
          this.messageEnregistrement = 'Enregistrement fait avec succes!';
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.messageEnregistrement, status : StatusNotification.SUCCESS});
          this.formValues.resetForm();
          this.ngOnInit();
        }, error => {
          this.erreurEnregistrement = 'Echec de l\'enregistrement, verifier votre connection au serveur';
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
          console.log(error)
        })
    } else if (this.actionFormulaire == 'Modifier') {

      let formatUpdate: FicheCollecteM = new FicheCollecteM();

      formatUpdate = new FicheCollecteM(
        this.valeuridFicher,
        dataForm.nomFiche,
        dataForm.lienMenu,
        dataForm.description,
        dataForm.baseQuestionnaireID,
        null,
        null,
        null,
        dataForm.nomFicheEN,
        dataForm.lienMenuEN,
        dataForm.descriptionEN
      );


      this.ficheCollecteService.updateFicheCollecte(formatUpdate)
        .subscribe(data => {
          this.messageEnregistrement = 'Modification fait avec succes !!!!!';
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.messageEnregistrement, status : StatusNotification.SUCCESS});

          this.formValues.resetForm();
          this.ngOnInit();
          this.labelButtonSave = 'Enregistrer';
          this.actionFormulaire = 'Enregistrer';

        }, error => {
          this.erreurEnregistrement = 'Echec de la modification, verifier avotre connection avec le serveur!';
          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
          console.log(error);

        })
    }
  }


  onSelectFicheCollecte(fichecollectes) {


    this.formValues.resetForm({
      idFicher : fichecollectes.id,
      nomFiche : fichecollectes.nomFiche,
      lienMenu : fichecollectes.lienMenu,
      description : fichecollectes.description,
      nomFicheEN :  fichecollectes.nomFicheEN,
      lienMenuEN : fichecollectes.lienMenuEN,
      descriptionEN : fichecollectes.descriptionEN,
      baseQuestionnaireID : fichecollectes.baseQuestionnaireID.id,
    });



    this.labelButtonSave = 'Modifier';
    this.actionFormulaire = 'Modifier';
    this.valeuridFicher = fichecollectes.id;

    /*
    this.valeurNomFiche = fichecollectes.nomFiche;
    this.valeurLienMenu = fichecollectes.lienMenu;
    this.valeurDescription = fichecollectes.description;
    this.valeurNomFicheEN = fichecollectes.nomFicheEN;
    this.valeurLienMenuEN = fichecollectes.lienMenuEN;
    this.valeurDescriptionEN = fichecollectes.descriptionEN;
    this.valeurBaseQuestionnaire = fichecollectes.baseQuestionnaireID.id;
*/

  }

  onQuitModal(modal) {
    this.alertModalError = false;
    this.alertModalSuccess = false;
    this.erreurEnregistrement = '';
    this.messageEnregistrement = '';
    modal.dismiss('Cross click');
    this.elements = [];
  }


  onPreView(idFile: FicheCollecteM) {
    this.idFicheInput = idFile.id;
    this.nomFicheInput = idFile.nomFiche;
  }


  onChargerElement(idFiche, content) {
    this.valeurFicheCollecteID = idFiche;
    this.currentFile = this.pageOfItems.find(element => element.id == idFiche);
    if (this.elements.length <= 0) {
      this.serviceNotification.configShowNotif.showLoading.text = "Chargement élément en cours";
      this.serviceNotification.configShowNotif.showLoading.show = true;
      this.elementFicheService.getElementFiches(idFiche)
        .subscribe(response => {

          // @ts-ignore
          let data = response.dataReturn;
          // @ts-ignore
          this.onTouchFile = (<boolean>response.success);
          if (this.onTouchFile == false) {
            this.alertModalError = true;
            // @ts-ignore
            this.erreurEnregistrement = response.message;
          }
          let conteElement2: ElementsFicheM = new ElementsFicheM();
          if ((<ElementsFicheM[]>data).length > 0) {
            let tempTabFormat1A: ElementsFicheM[] = [];
            for (let i = 0; i < (<ElementsFicheM[]>data).length; i++) {
              let formatElementFiche = new ElementsFicheM((<ElementsFicheM[]>data)[i].id,
                (<ElementsFicheM[]>data)[i].labelChamp,
                (<ElementsFicheM[]>data)[i].labelChampEN,
                (<ElementsFicheM[]>data)[i].alias,
                (<ElementsFicheM[]>data)[i].typeChamp,
                (<ElementsFicheM[]>data)[i].cadreAffichage,
                (<ElementsFicheM[]>data)[i].propriete,
                (<ElementsFicheM[]>data)[i].ficheElementID,
                (<ElementsFicheM[]>data)[i].ficheCollecte,
                (<ElementsFicheM[]>data)[i].baseElementStatGeneral
              );
              tempTabFormat1A.push(formatElementFiche);
            }

            this.elements = tempTabFormat1A;
            this.cardreAffichage = tempTabFormat1A;

          } else {
            let elementsFIcheNull: ElementsFicheM = new ElementsFicheM();
            elementsFIcheNull.alias = new Date().getTime() + '_' + this.valeurFicheCollecteID;
            this.elements.push(elementsFIcheNull);
          }
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.openXl(content)

        }, error => {
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.erreurEnregistrement = 'Echec de la modification, verifier avotre connection avec le serveur!';
          this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
          console.log(error)
        })

    } else {
      this.elements = [];
    }
  }


  addElement(ff: NgForm) {

    let concatem = this.elements.length - 1;
    let dataForm: ElementsFicheM = new ElementsFicheM();
    if (this.insertValeurSpecial==false){
       dataForm = new ElementsFicheM(this.elements.length,
        ff.value['labelChamp_' + concatem],
        ff.value['labelChampEN_' + concatem],
        ff.value['alia_' + concatem],
        ff.value['typeChamp_' + concatem],
        ff.value['cadreAffichage_' + concatem],
        ff.value['propriete_' + concatem],
        this.valeurFicheCollecteID
      );
    }else{
       dataForm = new ElementsFicheM(this.elements.length,
         ff.value['labelChamp_' + concatem] || this.valeurChampSpecial,
         ff.value['labelChampEN_' + concatem] || this.valeurChampSpecialEN,
        ff.value['alia_' + concatem],
        ff.value['typeChamp_' + concatem],
        ff.value['cadreAffichage_' + concatem],
        ff.value['propriete_' + concatem],
        this.valeurFicheCollecteID
      );
    }

    console.log("valeur de ma fonction", dataForm.typeChamp);
    console.log("valeur de ma fonction", this.isSpecialCadre(dataForm.typeChamp));
    console.log("DONNEES STATIC EN REMPLIR", dataForm.cadreAffichage);

      if (dataForm.cadreAffichage == null && this.isSpecialCadre(dataForm.typeChamp) == false)  {
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : " veuillez sélèctionner un cadre d'affichage",
          status : StatusNotification.ERROR
        });
        return;
      } else if (dataForm.ficheElementID == null) {
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : " veuillez recommencer l'enregistrement, fiche non prise en compte",
          status : StatusNotification.ERROR
        });
        return;
      } else if (dataForm.cadreAffichage != null &&  dataForm.labelChamp == "")  {
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : "veuillez remplir le label en français",
          status : StatusNotification.ERROR
        });
        return;
      } else if (dataForm.cadreAffichage != null && dataForm.labelChampEN == "")  {
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : "veuillez remplir le label en anglais",
          status : StatusNotification.ERROR
        });
        return;
      } else if (dataForm.typeChamp == "")  {
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : "veuillez sélèctionner un type pour cet élément",
          status : StatusNotification.ERROR
        });
        return;
      } else {
        this.onSaveElements(dataForm);
      }


  }

  isSpecialCadre(val){
    console.log("cardre principal JE SUIS DEJA LA !!!!!");
    if (val=="cadrequestion") {
      return true;
    }else if (val == "metaDonnees") {
      return true;
    }else if (val == "cadre") {
      return true;
    }else if (val == "coordonnee") {
      return true;
    }else if (val == "localisation") {
      return true;
    }else if (val == "localisationVillage") {
      return true;
    }else {
        return false;
    }
  }


  removeElement(valElement: ElementsFicheM, i) {
    if (valElement.id != null) {
      let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm();
      valFornotif.then((result) => {
        if (result.value) {
          this.serviceNotification.configShowNotif.showLoading.text = "Suppression en cours";
          this.serviceNotification.configShowNotif.showLoading.show = true;
          this.elementFicheService.deleteElementFiche(valElement).subscribe(
            (reponse)=>{
              this.serviceNotification.configShowNotif.showLoading.show = false;
              this.messageEnregistrement = "suppression éffèctue avec succès!";
              swalWithBootstrapButtons.fire(
                'Deleted!',
                this.messageEnregistrement,
                StatusNotification.SUCCESS
              );
              let conteElement2: ElementsFicheM[] = []
              for (let i = 0; i < (<ElementsFicheM[]>reponse).length; i++) {
                let formatElementFiche = new ElementsFicheM(
                  (<ElementsFicheM[]>reponse)[i].id,
                  (<ElementsFicheM[]>reponse)[i].labelChamp,
                  (<ElementsFicheM[]>reponse)[i].labelChampEN,
                  (<ElementsFicheM[]>reponse)[i].alias,
                  (<ElementsFicheM[]>reponse)[i].typeChamp,
                  (<ElementsFicheM[]>reponse)[i].cadreAffichage,
                  (<ElementsFicheM[]>reponse)[i].propriete,
                  (<ElementsFicheM[]>reponse)[i].ficheElementID,
                  (<ElementsFicheM[]>reponse)[i].ficheCollecte,
                  (<ElementsFicheM[]>reponse)[i].baseElementStatGeneral
                );
                conteElement2.push(formatElementFiche);
              }
              this.elements = [];
              this.cardreAffichage = [];
              this.elements = conteElement2;
              this.cardreAffichage = conteElement2;
            },
            (error)=>{
              console.log("MESSAGE ERREUR DE CELUI QUI VA ETRE SUPPPRIME : ", error);
              this.serviceNotification.configShowNotif.showLoading.show = false;
              this.erreurEnregistrement = "Echec de la suppression, vérifier la connection avec le serveur!";
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
    } else {
      this.elements.splice(i, 1);
    }
  }






  onUpdateElement(vallabelChamp, vallabelChampEN, valalias, valTypeChamp, valpropriete, valcadreAffichage, valid: ElementsFicheM) {

    let formatUpdate: ElementsFicheM = new ElementsFicheM(valid.id,
      vallabelChamp.value,
      vallabelChampEN.value,
      valalias.value,
      valTypeChamp.value,
      valcadreAffichage.value,
      valpropriete.value,
      'update',
      valid.ficheCollecte);

   this.serviceNotification.configShowNotif.showLoading.text = "Mise à jour en cours";
   this.serviceNotification.configShowNotif.showLoading.show = true;
    this.elementFicheService.updateElementFiche(formatUpdate).subscribe(
      (data) => {
        console.log("UPDATE : ",data);
        this.serviceNotification.configShowNotif.showLoading.show = false;
        // @ts-ignore
        let response = data.dataReturn;
        // @ts-ignore
        this.alertModalSuccess = true;
        // @ts-ignore
        this.messageEnregistrement = data.message;
        this.elements = [];
        this.cardreAffichage = [];
        let conteElement2: ElementsFicheM[] = []
        for (let i = 0; i < (<ElementsFicheM[]>response).length; i++) {
          let formatElementFiche = new ElementsFicheM((<ElementsFicheM[]>response)[i].id,
            (<ElementsFicheM[]>response)[i].labelChamp,
            (<ElementsFicheM[]>response)[i].labelChampEN,
            (<ElementsFicheM[]>response)[i].alias,
            (<ElementsFicheM[]>response)[i].typeChamp,
            (<ElementsFicheM[]>response)[i].cadreAffichage,
            (<ElementsFicheM[]>response)[i].propriete,
            (<ElementsFicheM[]>response)[i].ficheElementID,
            (<ElementsFicheM[]>response)[i].ficheCollecte,
            (<ElementsFicheM[]>response)[i].baseElementStatGeneral
          );
          conteElement2.push(formatElementFiche);
        }
        this.elements = conteElement2;
        this.cardreAffichage = conteElement2;
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : this.messageEnregistrement,
          status : StatusNotification.SUCCESS
        });
      },
      (error) => {
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : " Echec de Mise à jour de cet élément",
          status : StatusNotification.ERROR
        });
        console.log(error);
      }
    )

  }


  onDeleteFicheCollecte(id: number) {

    let  {valFornotif , swalWithBootstrapButtons }  = this.serviceNotification.swalConfirm();
    valFornotif.then((result) => {
      if (result.value) {
        this.serviceNotification.configShowNotif.showLoading.text = "Suppression En cours";
        this.serviceNotification.configShowNotif.showLoading.show = true;
        this.ficheCollecteService.deleteFicheCollecte(id).subscribe(
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


  onChangeNamepropriete(objTypeChamp: NgModel, content?, currentojb?: ElementsFicheM) {

    this.currentElementFiche = currentojb;
    console.log("value ", objTypeChamp.value);
    console.log("element  coursent  : ", currentojb);

    switch (objTypeChamp.value) {
      case 'text' :
        this.nameProprieteChange = 'Taille du texte';
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias';
        break;
      case 'textarea' :
        this.nameProprieteChange = 'Taille du texte';
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias';
        break;
      case 'email':
        this.nameProprieteChange = 'format email';
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias';
        break;
      case 'date':
        this.nameProprieteChange = 'format de date';
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias';
        break;
      case 'number':
        this.nameProprieteChange = 'format numero';
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias';
        break;
      case 'file':
        this.nameProprieteChange = 'taille du fichier';
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias';
        break;
      case 'select' :
        this.nameProprieteChange = 'Insérer options séparer par (;)'
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias (unique)';
        break;
      case 'button' :
        this.nameProprieteChange = 'texte du button';
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias';
        break;
      case 'checkbox':
        this.nameProprieteChange = 'Taille du texte';
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias';
        break;
      case 'url':
        this.nameProprieteChange = 'format URL';
        break;
      case 'time':
        this.nameProprieteChange = 'Format heure';
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias';
        break;
      case 'submit':
        this.nameProprieteChange = 'Enregistrer';
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias';
        break;
      case 'reset':
        this.nameProprieteChange = 'Reset';
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias';
        break;
      case 'cadre':
        this.nameProprieteChange = 'Nombre de colonne (4 max)';
        this.namelabelFR = 'Label du champ';
        this.namelabelEN = 'Label du champ';
        this.nameAlias = 'Alias';
        break;
      case 'cadreouinon':
        this.nameProprieteChange = 'Pas de valeur';
        this.namelabelFR = 'Nom du cadre';
        this.namelabelEN = 'Nom du cadre';
        this.nameAlias = 'Alias unique des cadres';
        break;
      case 'ouinon':
        this.nameProprieteChange = 'Pas de valeur';
        this.namelabelFR = 'Votre question';
        this.namelabelEN = 'Votre question';
        this.nameAlias = 'Libélé unique affichage';
        break;
      case 'laboratoires':
        this.nameProprieteChange = 'Pas de valeur';
        this.valeurChampSpecial = 'laboratoires';
        this.valeurChampSpecialEN = 'laboratoires';
        this.insertValeurSpecial = true;
        break;
      case 'especes':
        this.openSm(content);
        this.nameProprieteChange = 'Pas de valeur';
        this.valeurChampSpecial = 'Especes';
        this.valeurChampSpecialEN = 'Especes';
        this.insertValeurSpecial = true;
        break;
      case 'pathologies':
        this.nameProprieteChange = 'Pas de valeur';
        this.valeurChampSpecial = 'Pathologies';
        this.valeurChampSpecialEN = 'Pathologies';
        this.insertValeurSpecial = true;
        break;
      case 'naturePrelevement':
        this.nameProprieteChange = 'Pas de valeur';
        this.valeurChampSpecial = 'Natures de Prélèvement';
        this.valeurChampSpecialEN = 'Natures de Prélèvement';
        this.insertValeurSpecial = true;
        break;
      case 'typeAnalyse':
        this.nameProprieteChange = 'Pas de valeur';
        this.valeurChampSpecial = 'Types d\'analyse';
        this.valeurChampSpecialEN = 'Types d\'analyse';
        this.insertValeurSpecial = true;
        break;
      case 'oie':
        this.nameProprieteChange = 'Pas de valeur';
        this.valeurChampSpecial = 'Pays OIE';
        this.valeurChampSpecialEN = 'Pays OIE';
        this.insertValeurSpecial = true;
        break;
      case 'sourceContamination':
        this.nameProprieteChange = 'Pas de valeur';
        this.valeurChampSpecial = 'Sources de Contamination';
        this.valeurChampSpecialEN = 'Sources de Contamination';
        this.insertValeurSpecial = true;
        break;
      case 'mesureControle':
        this.nameProprieteChange = 'Pas de valeur';
        this.valeurChampSpecial = 'Mesures de Controle';
        this.valeurChampSpecialEN = 'Mesures de Controle';
        this.insertValeurSpecial = true;
        break;
      case 'typeVaccin':
        this.nameProprieteChange = 'Pas de valeur';
        this.valeurChampSpecial = 'Types de Vaccin';
        this.valeurChampSpecialEN = 'Types de Vaccin';
        this.insertValeurSpecial = true;
        break;
      case 'typeProduction':
        this.nameProprieteChange = 'Pas de valeur';
        this.valeurChampSpecial = 'Types de Production';
        this.valeurChampSpecialEN = 'Types de Production';
        this.insertValeurSpecial = true;
        break;
      case 'systemeProduction':
        this.nameProprieteChange = 'Pas de valeur';
        this.valeurChampSpecial = 'Systeme de Production';
        this.valeurChampSpecialEN = 'Systeme de Production';
        this.insertValeurSpecial = true;
        break;
      case 'maladies':
        this.openSm(content);
        this.nameProprieteChange = 'Pas de valeur';
        this.valeurChampSpecial = 'Maladies';
        this.valeurChampSpecialEN = 'Maladies';
        this.insertValeurSpecial = true;
        break;
      default:
        this.nameProprieteChange = 'Pas de valeur';

    }

  }


  onSaveElements(oneElementFiche: ElementsFicheM) {



    let cloneElement = [].concat(this.elements);

    this.serviceNotification.configShowNotif.showLoading.text = "Ajout élément en cours"
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.visibleSpinner = true;
    this.elementFicheService.saveElementFiche(oneElementFiche)
      .subscribe(response => {

        // @ts-ignore
        let data = response.dataReturn;

        // @ts-ignore
        if (response.success == true && response.codeStatus == 'SUCCESS_SAVE') {

          let contenuFiche3: ElementsFicheM = new ElementsFicheM();

          let convert = (<ElementsFicheM>data);
          contenuFiche3 = new ElementsFicheM(
            data['id'],
            data['labelChamp'],
            data['labelChampEN'],
            data['alias'],
            data['typeChamp'],
            data['cadreAffichage'],
            data['propriete'],
            data['ficheCollecte'].id
          );

          this.serviceNotification.openToast({titre : "Notification", message : "succes de l'enregistremnt de element "+contenuFiche3.labelChamp, status : StatusNotification.SUCCESS});

          for (let y = 0; y < cloneElement.length; y++) {
            let indexDelete: number = this.elements.findIndex(element => element.id == null);
            if (indexDelete != null) {
              cloneElement.splice(indexDelete, 1);
            }
          }
          let elementsFIcheNull: ElementsFicheM = new ElementsFicheM();
          elementsFIcheNull.alias = new Date().getTime() + '_' + this.valeurFicheCollecteID;
          cloneElement.push(contenuFiche3);
          cloneElement.push(elementsFIcheNull);

          this.cardreAffichage = cloneElement;
          this.elements = cloneElement;
        }
        this.visibleSpinner = false;
        this.insertValeurSpecial = false;
        this.serviceNotification.configShowNotif.showLoading.show = false;
      }, error => {
        this.visibleSpinner = false;

        if (error.error.codeNumber == 108) {
          let elementsFIcheNull: ElementsFicheM = new ElementsFicheM();
          elementsFIcheNull.alias = new Date().getTime() + '_' + this.valeurFicheCollecteID;
          this.elements.push(elementsFIcheNull);
          console.log("les element de cette fiche deburg : ", this.elements);
        }
        if (error.error.codeNumber == 107) {
          console.log('ERREUR DE CREATION DE L\'ELEMENT');
          this.serviceNotification.openToast({titre : "Notification", message : "Erreur de création de l'élément", status : StatusNotification.ERROR});
        }
      });
    this.insertValeurSpecial = false;
    this.serviceNotification.configShowNotif.showLoading.show = false;
  }


  onChoiseElementStat(valeurElementStat) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    this.ficheCollecteService.defineElementStat(valeurElementStat).subscribe(
      (reponse) => {
        this.serviceNotification.configShowNotif.showModalBlock = false;
        this.serviceNotification.openToast({titre : "Notification", message : "Succes de Définition de la fiche de collecte par défaut ", status : StatusNotification.SUCCESS});
        this.ngOnInit();
      },
      (error) => {
        this.serviceNotification.configShowNotif.showModalBlock = false;
        console.log(error);
        this.erreurEnregistrement = error.error.message;
        this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
      }
    )
  }

  cancelAction() {
    this.labelButtonSave = 'Enregistrer';
    this.formValues.resetForm();
  }

  closeAlertError() {
    this.alertError.nativeElement.classList.remove('show');
    this.alertError.nativeElement.classList.add('hide');
  }


  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.alert.nativeElement.classList.add('hide');
  }


  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, {windowClass: 'dark-modal'});
  }

  openSm(content) {
    this.modalService.open(content, {size: 'sm'});
  }

  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  openXl(content) {
    // @ts-ignore
    this.modalService.open(content, {size: 'xl'});
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  onBaseElementStatGeneral(idElement) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    this.elementFicheService.defineBaseElementStatGeneral(idElement).subscribe(
      (reponse) => {
        this.serviceNotification.configShowNotif.showModalBlock = false;
        let tempTabFormat: ElementsFicheM[] = [];
        for (let i = 0; i < (<ElementsFicheM[]>reponse).length; i++) {
          let formatElementFiche = new ElementsFicheM((<ElementsFicheM[]>reponse)[i].id,
            (<ElementsFicheM[]>reponse)[i].labelChamp,
            (<ElementsFicheM[]>reponse)[i].labelChampEN,
            (<ElementsFicheM[]>reponse)[i].alias,
            (<ElementsFicheM[]>reponse)[i].typeChamp,
            (<ElementsFicheM[]>reponse)[i].cadreAffichage,
            (<ElementsFicheM[]>reponse)[i].propriete,
            (<ElementsFicheM[]>reponse)[i].ficheElementID,
            (<ElementsFicheM[]>reponse)[i].ficheCollecte,
            (<ElementsFicheM[]>reponse)[i].baseElementStatGeneral
          );
          tempTabFormat.push(formatElementFiche);
        }
        this.elements = [];
        this.elements = tempTabFormat;
        this.cardreAffichage = tempTabFormat;
        this.serviceNotification.openToast({titre : "Notification", message : "Succes de Définition de l'élément par défaut par défaut ", status : StatusNotification.SUCCESS});
      },
      (error) => {
        console.log(error);
        this.erreurEnregistrement = error.error.message;
        this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
      }
    )
  }


  onChangePageRecup(dataRecup) {
    this.page = dataRecup;
    this.pageOfItems = [];
    if (dataRecup == 1) {
      this.pageOfItems = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.pageOfItems = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.pageOfItems = this.listForPaginaition.slice(0, valNbre);
  }


  onQuitModalselect(modal) {
    modal.dismiss('Cross click');
  }


  onDuplicateFicheCollecte(idFiche) {
    this.serviceNotification.configShowNotif.showLoading.text = "Duplication en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.ficheCollecteService.duplicateFicheService(idFiche).subscribe(
      (reponse) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.messageEnregistrement = 'Modification fait avec succes !!!!!';
        this.serviceNotification.openToast({titre : "Notification", message : this.messageEnregistrement, status : StatusNotification.SUCCESS});
        this.ngOnInit();
      },
      (error) => {
        console.log(error)
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.erreurEnregistrement = 'Echec de la duplication, une erreur c\'est produit !!!!!';
        this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.ERROR});
      }
    )
  }
}
