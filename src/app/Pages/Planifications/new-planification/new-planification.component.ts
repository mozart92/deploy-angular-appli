import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {BaseQuestionnaireM} from '../../../Model/BaseQuestionnaireM';
import {BaseQuestionnaireService} from '../../../Services/baseQuestionnaire.service';
import {NewPlannificationService} from '../../../Services/newPlannification/new-plannification.service';
import {NewPlanification} from '../../../Model/NewPlanification';
import {IDropdownSettings} from 'ng-multiselect-dropdown/multiselect.model';
import {
  StatusNotification,
  TypeConfigNotification,
  TypeToast
} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {translateContenufunction} from '../../../ServiceAPI/GeneralAPI';


interface TypeBDCollecte {
  id;
  nomBase;
}

@Component({
  selector: 'app-new-planification',
  templateUrl: './new-planification.component.html',
  styleUrls : ['new-planification.component.css']

})
export class NewPlanificationComponent implements OnInit, OnDestroy {

  icon = 'pe-7s-timer icon-gradient bg-premium-dark';
  currentLangue = localStorage.getItem("langue");

  headingFR = 'Gestion des planifications des questionnaires';
  headingEN = 'Management of questionnaire planning';

  subheadingFR = 'Enregistrer, Modifier, Supprimer, Archiver des planifications de questionnaires';
  subheadingEN = 'Save, Modify, Delete, Archive questionnaire schedules';

  infoGeneralFR = "Informations générales";
  infoGeneralEN = "General information";

  retournFR = "Retouner";
  retournEN = "Return";

  labelTitreFormulaire = 'Enregistrement des données';
  labelTitreFormulaireEN = 'Data saving';


  labelTitreTableau = 'Liste des régions enregistrés';
  labelTitreTableauEN = 'List of saved regions';


  messageEnregistrement='Enregistrement effectué avec succès!';
  messageEnregistrementEN='Successful savings!';

  erreurEnregistrement='Erreur enregistrement! Vérifier doublons ou connexion au serveur';
  erreurEnregistrementEN='Registration error! Check duplicates or server connection';

  //TRADUCTION CONTENU APPLICATION
  nomCollecteFR = "Nom de la collecte";
  nomCollecteEN = "Name of the collection";

  intitulerPlanificationFR = "Intitulé de la planification";
  intitulerPlanificationEN = "Title of the planning";

  selectionnerBaseQuestionnairePlanificationFR = "Sélectionner les bases de questionnaire de votre planification";
  selectionnerBaseQuestionnairePlanificationEN = "Select the questionnaire basics for your planning";

  remplirObservationsFrancaiseFR = "Remplir vos observations, version francaise (FR)";
  remplirObservationsFrancaiseEN = "Fill in your comments, French version (FR)";

  remplirObservationsAnglaiseFR = "Remplir vos observations, version anglaise (EN)";
  remplirObservationsAnglaiseEN = "Fill in your comments, English version (EN)";


  remplirObjectifFrancaiseFR = "Remplir vos objectifs, version francaise (FR)";
  remplirObjectifFrancaiseEN = "Fill in your objectives, french version (FR)";

  remplirObjectifAnglaiseFR = "Remplir vos objectifs, version anglaise (EN)";
  remplirObjectifAnglaiseEN = "Fill in your objectives, English version (EN)";

  chargerBaseQuestionnairesExistantFR = "Charger les bases de données de questionnaires existants";
  chargerBaseQuestionnairesExistantEN = "Load existing questionnaire databases";

  champOblicatoirFR = "Champ obligatoire, veuillez remplir";
  champOblicatoirEN = "Mandatory field, please fill in";

  dateDebutFR = "Date de début";
  dateDebutEN = "Start Date";

  dateFinFR = "Date de fin";
  dateFinEN = "End Date";

  frequenceDonneesFR = "Fréquence de remonter des données";
  frequenceDonneesEN = "Frequency of data reporting";

  choisirFR = "choisir";
  choisirEN = "choose";

  JournaliereFR = "Journalière";
  JournaliereEN = "Newspaper";

  HebdomadaireFR = "Hebdomadaire";
  HebdomadaireEN = "Weekly";

  MensuelleFR = "Mensuelle";
  MensuelleEN = "Monthly";

  AnnuelleFR = "Annuelle";
  AnnuelleEN = "Annual";

  apartirDeFR = "A partir de";
  apartirDeEN = "Starting from";

  typeClotureFR = "Type de clôture";
  typeClotureEN = "Type of closure";

  automatiqueValueFR = "Automatique";
  automatiqueValueEN = "Automatic";


  baseDonneesFR = "Bases de données de questionnaires existants";
  baseDonneesEN = "Database concerned";

  observationFR = "Observations";
  observationEN = "Observations";

  objectifFR = "Objectifs";
  objectifEN = "Objectives";

  actionFormulaire='Enregistrer';
  titreBoutonEdit='Modifier';
  titreBoutonDelete='Supprimer';
  labelButtonSave = 'Enregistrer';
  labelButtonSaveEN = 'Save';



  @ViewChild('formuser') formuser;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;
  @Input() reseiveData;
  @Output() sendValidationForShow = new EventEmitter();


  valeurId;
  valeurlibellePlanning;
  valeurlibellePlanningEN;
  valeurdateDebut;
  valeurdateFin;
  valeurfrequence;
  valeurdateEffictif;
  valeurtypeCloture: String='';
  valeurobservations: String='';
  valeurobservationsEN: String='';
  valeurcollectBaseQuestionnaire='';
  valeurobjectif;
  valeurobjectifEN;

  reponseForUpdate:any;

  dataBaseQuestionnaire: Array<BaseQuestionnaireM>= [];

  pageOfItems: Array<any>;


  myForm: FormGroup = this.fb.group({
    baseQuestionnaire: []
  });

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    defaultOpen: false,
    idField: 'id',
    textField: 'nomBase',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: true,
    itemsShowLimit: 4,
    allowSearchFilter: true
  };

  baseQuestionnaire: Array<TypeBDCollecte> = [];
  selectBDcollecteMultiple : TypeBDCollecte[] = [];
  repechBDcollecteMultiple : TypeBDCollecte[] = [];
  tabIdBDcollecteSelectMultipl : any[] = [];

  term = '';


  constructor(private serBDQuestionnaire: BaseQuestionnaireService,
              private servicePlanning : NewPlannificationService,
              private fb: FormBuilder,
              public serviceNotification : NotificationsGeneralService) { }

  ngOnInit() {
    this.chargeBaseQuestionnaire();
  }

  ngOnDestroy(): void {}

  chargeBaseQuestionnaire(){
    this.serviceNotification.configShowNotif.showLoading.text = translateContenufunction("Chargement en cours", "Loading in progress");
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.serBDQuestionnaire.getBaseQuestionnaires().subscribe(
      (reponse)=>{
        this.dataBaseQuestionnaire = (<Array<BaseQuestionnaireM>>reponse);
        for (let i=0; i<this.dataBaseQuestionnaire.length; i++){
          this.repechBDcollecteMultiple.push({'id':this.dataBaseQuestionnaire[i].id, 'nomBase':translateContenufunction(this.dataBaseQuestionnaire[i].nomBase, this.dataBaseQuestionnaire[i].nomBaseEN)});
        }
        this.initValueForUpdate(this.reseiveData);
        this.serviceNotification.configShowNotif.showLoading.show = false;
      },
      (error)=>{

      if (error.status == 0){
          this.serviceNotification.openToast({
            titre : "Notification",
            message : "Probleme de connexcion au serveur, vérifier votre connexion internet",
            status : StatusNotification.SUCCESS})
        }else {
          this.serviceNotification.openToast({
            titre : "Notification",
            message : "Erreur inconnu, veuillez contacter l'administrateur",
            status : StatusNotification.SUCCESS})
        }

        //- Erreur de connection au serveur
        //- Erreur inconnu
        this.serviceNotification.configShowNotif.showLoading.show = false;
        console.log(error);
      }
    )
  }


  onSavePlanning(formPlanning : NgForm) {
    this.serviceNotification.configShowNotif.showModalBlock = true;
    if(this.labelButtonSave=="Enregistrer" || this.labelButtonSaveEN=="Save") {

      let formatNewPlanning2 = new NewPlanification();

      formatNewPlanning2 = new NewPlanification(
        null,
        formPlanning.value.libellePlanning,
        formPlanning.value.dateDebut,
        formPlanning.value.dateFin,
        formPlanning.value.frequence,
        formPlanning.value.dateEffictif,
        formPlanning.value.typeCloture,
        formPlanning.value.observations,
        this.tabIdBDcollecteSelectMultipl,
        null,
        formPlanning.value.objectif,
        localStorage.getItem("token"),
        null,
        null,
        formPlanning.value.libellePlanningEN,
        formPlanning.value.observationsEN,
        formPlanning.value.objectifEN
      );

      this.servicePlanning.addPlannification(formatNewPlanning2).subscribe(
        (reponse)=>{
          // - enregistrement reussi

          this.serviceNotification.configShowNotif.showModalBlock = false;
          this.serviceNotification.swalSuccess({title : translateContenufunction("Enregistrement éffectué avec succés!", "Successfully registered!"), icon : StatusNotification.SUCCESS});
          this.formuser.resetForm();
          this.myForm.get('baseQuestionnaire').setValue([]);
          this.ngOnInit();
        },
        (error)=>{
          // - erreur connexion au serveur
          // - Enregistrement echou
          // - error inconnu

          if(error.error.codeNumber == 202){
            this.serviceNotification.swalError({
              icon: StatusNotification.ERROR,
              title: "Echec de l'Opération",
              text: translateContenufunction("Echec de l'enregistrement", "Echec de l'enregistrement")
            });
          }else if(error.status == 0){
            this.serviceNotification.swalError({
              icon: StatusNotification.ERROR,
              title: "Echec de l'Opération",
              text: translateContenufunction("Probleme de connexcion au serveur, vérifier votre connexion internet", "Probleme de connexcion au serveur, vérifier votre connexion internet")
            });
          }else{
            this.serviceNotification.swalError({
              icon: StatusNotification.ERROR,
              title: "Echec de l'Opération",
              text: translateContenufunction("Erreur inconnu, veuillez contacter l'administrateur", "Erreur inconnu, veuillez contacter l'administrateur")
            });
          }

          this.serviceNotification.configShowNotif.showModalBlock = false;

          console.log(error)
        }
      );

    }
    else if(this.labelButtonSave=="Modifier" || this.labelButtonSaveEN=="Update") {
      let formatUpdatePlanning = new NewPlanification();
      formatUpdatePlanning = new NewPlanification(
        this.valeurId,
        formPlanning.value.libellePlanning,
        formPlanning.value.dateDebut,
        formPlanning.value.dateFin,
        formPlanning.value.frequence,
        formPlanning.value.dateEffictif,
        formPlanning.value.typeCloture,
        formPlanning.value.observations,
        this.tabIdBDcollecteSelectMultipl,
        null,
        formPlanning.value.objectif,
        null,
        null,
        null,
        formPlanning.value.libellePlanningEN,
        formPlanning.value.observationsEN,
        formPlanning.value.objectifEN
      );

      this.servicePlanning.updatePlannification(formatUpdatePlanning)
        .subscribe(
          (response)=> {
            this.reponseForUpdate = response;

            this.serviceNotification.configShowNotif.showModalBlock = false;
            this.serviceNotification.swalSuccess({title : translateContenufunction("Modification éffèctué avec succés !!!!!", "Successfully modified !!!!!"), icon : StatusNotification.SUCCESS});

            this.formuser.resetForm();
            this.myForm.get('baseQuestionnaire').setValue([]);
          },
          (error) => {
            // - erreur connexion au serveur
            // - Enregistrement echou
            this.serviceNotification.configShowNotif.showLoading.show = false;
            this.serviceNotification.configShowNotif.showModalBlock = false;
            if(error.error.codeNumber == 202){
              this.serviceNotification.swalError({
                icon: StatusNotification.ERROR,
                title: "Echec de l'Opération",
                text: translateContenufunction("Echec de l'enregistrement", "Echec de l'enregistrement")
              });
            }else if(error.status == 0){
              this.serviceNotification.swalError({
                icon: StatusNotification.ERROR,
                title: "Echec de l'Opération",
                text: translateContenufunction("Probleme de connexcion au serveur, vérifier votre connexion internet", "Probleme de connexcion au serveur, vérifier votre connexion internet")
              });
            }else{
              this.serviceNotification.swalError({
                icon: StatusNotification.ERROR,
                title: "Echec de l'Opération",
                text: translateContenufunction("Erreur inconnu, veuillez contacter l'administrateur", "Erreur inconnu, veuillez contacter l'administrateur")
              });
            }
            console.log(error);
          }
        )
    }

  }

  initValueForUpdate(valueForupdate: NewPlanification){


    if (this.reseiveData){

      this.labelButtonSave = "Modifier";
      this.labelButtonSaveEN = "Update";

      this.valeurId = valueForupdate.id;
      this.valeurobservations = valueForupdate.observations;
      this.valeurobservationsEN = valueForupdate.observationsEN;
      this.valeurtypeCloture = valueForupdate.typeCloture;
      this.valeurdateEffictif = valueForupdate.dateEffictif;
      this.valeurfrequence = valueForupdate.frequence;
      this.valeurdateFin = valueForupdate.dateFin;
      this.valeurdateDebut = valueForupdate.dateDebut;
      this.valeurobjectif = valueForupdate.objectif;
      this.valeurobjectifEN = valueForupdate.objectifEN;
      this.valeurlibellePlanning = valueForupdate.libellePlanning;
      this.valeurlibellePlanningEN = valueForupdate.libellePlanningEN;

      this.baseQuestionnaire = this.repechBDcollecteMultiple;

      let tabIdBDcollecteSelectMultipl : BaseQuestionnaireM[] =  (valueForupdate.baseQuestionnaires as BaseQuestionnaireM[]);
      let initModifGroupApp : TypeBDCollecte[] = [];
      for (let i = 0; i < tabIdBDcollecteSelectMultipl.length; i++){
        initModifGroupApp.push({'id':tabIdBDcollecteSelectMultipl[i].id, 'nomBase':tabIdBDcollecteSelectMultipl[i].nomBase})
      }
      this.myForm.get('baseQuestionnaire').setValue(initModifGroupApp);
    }
  }


  cancelAction(){
    if (this.reponseForUpdate==null){
      this.sendValidationForShow.emit({isShow:true});
    }else{
      this.sendValidationForShow.emit({dataToChange:  this.reponseForUpdate, isShow: false});
    }

  }



  onItemSelect(item: any) {
    this.tabIdBDcollecteSelectMultipl = [];
    this.selectBDcollecteMultiple = this.myForm.get('baseQuestionnaire').value;
    for (let i = 0; i < (this.myForm.get('baseQuestionnaire').value as TypeBDCollecte[]).length; i++){
      this.tabIdBDcollecteSelectMultipl.push((this.myForm.get('baseQuestionnaire').value as TypeBDCollecte[])[i].id);
    }
  }


  onSelectAll(items: any) {
    this.tabIdBDcollecteSelectMultipl = [];
    this.selectBDcollecteMultiple = this.myForm.get('baseQuestionnaire').value;
    for (let i = 0; i < (this.myForm.get('baseQuestionnaire').value as TypeBDCollecte[]).length; i++){
      this.tabIdBDcollecteSelectMultipl.push((this.myForm.get('baseQuestionnaire').value as TypeBDCollecte[])[i].id);
    }
  }

  onDropDownClose() {
    this.tabIdBDcollecteSelectMultipl = [];
    this.selectBDcollecteMultiple = (this.myForm.get('baseQuestionnaire').value as TypeBDCollecte[]);
    if (this.myForm.get('baseQuestionnaire').value!=null){
      for (let i = 0; i < (this.myForm.get('baseQuestionnaire').value as TypeBDCollecte[]).length; i++){
        this.tabIdBDcollecteSelectMultipl.push((this.myForm.get('baseQuestionnaire').value as TypeBDCollecte[])[i].id);
      }
    }
  }

  onGroupApp(){
    this.baseQuestionnaire = [];
    this.baseQuestionnaire = this.repechBDcollecteMultiple;
  }
}
