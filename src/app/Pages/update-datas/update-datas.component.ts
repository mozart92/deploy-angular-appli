import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {ElementFicheService} from '../../Services/elementFiche.service';
import {ElementsFicheM} from '../../Model/ElementsFicheM';
import {AnwserQuestionsService} from '../../Services/anwserQuestions/anwser-questions.service';
import {AnwserQuestions} from '../../Model/anwserQuestions';
import {DepartementM} from '../../Model/departementM';
import {RegionM} from '../../Model/RegionM';
import {CommuneM} from '../../Model/CommuneM';
import {RegionService} from '../../Services/Region/region.service';
import {DepartementService} from '../../Services/Departement/departement.service';
import {CommuneService} from '../../Services/Commune/commune.service';
import {LaboratoiresM} from '../../Model/LaboratoiresM';
import {EspecesM} from '../../Model/EspecesM';
import {PathologiesM} from '../../Model/PathologiesM';
import {NaturePrelevementM} from '../../Model/NaturePrelevementM';
import {AnalyseLaboratoireM} from '../../Model/AnalyseLaboratoireM';
import {MaladiesM} from '../../Model/MaladiesM';
import {OIEM} from '../../Model/OIEM';
import {SourceContaminationM} from '../../Model/SourceContaminationM';
import {MesuresControleM} from '../../Model/MesuresControleM';
import {TypeVaccinM} from '../../Model/TypeVaccinM';
import {TypeProductionM} from '../../Model/TypeProductionM';
import {SystemProductionM} from '../../Model/SystemProductionM';
import {LaboratoiresService} from '../../Services/Laboratoires/laboratoires.service';
import {EspecesService} from '../../Services/Especes/especes.service';
import {PathologiesService} from '../../Services/Pathologies/pathologies.service';
import {NaturePrelevementService} from '../../Services/NaturePrelevement/nature-prelevement.service';
import {AnalyseLaboratoireService} from '../../Services/AnalyseLaboratoire/analyse-laboratoire.service';
import {MaladiesService} from '../../Services/Maladies/maladies.service';
import {OIEService} from '../../Services/OIE/oie.service';
import {SourceContaminationService} from '../../Services/SourceContamination/source-contamination.service';
import {MesuresControleService} from '../../Services/MesuresControle/mesures-controle.service';
import {TypeVaccinService} from '../../Services/TypeVaccin/type-vaccin.service';
import {TypeProductionService} from '../../Services/TypeProduction/type-production.service';
import {SystemProductionService} from '../../Services/SystemProduction/system-production.service';
import {CzvsService} from '../../Services/czvs/czvs.service';
import {CzvsModel} from '../../Model/CzvsModel';
import {VillagesService} from '../../Services/Villages/villages.service';
import {VillagesM} from '../../Model/VillagesM';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NotificationsGeneralService} from '../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../ComposantsPerso/notifications-operation/notifications-operation.component';
import {ModeProductionService} from '../../PlatesFormes/mode-production.service';

@Component({
  selector: 'app-update-datas',
  templateUrl: './update-datas.component.html',
  styleUrls: ['./update-datas.component.sass']
})
export class UpdateDatasComponent implements OnInit, OnDestroy {


  currentDate = new Date().getMonth() + '/' + new Date().getDay() + '/' + new Date().getFullYear();


  nomOfFiche: String;
  heading;
  subheading = '';
  icon = 'pe-7s-config icon-gradient bg-premium-dark';

  idPlanning: any;

  @ViewChild('formProgramm') formProgramm;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;
  @Input() dataEnter: AnwserQuestions = null;
  @Input() nomFicheInput = null;
  @Output() isReturn = new EventEmitter();


  valeurRegion = '';
  valeurDepartement = '';
  valeurCommune = '';
  valeurCZV = '';
  valeurVillage = '';


  labelTitreFormulaire = 'Enregistrement des données';
  labelButtonSave = 'Enregistrer';
  labelTitreTableau = 'Liste des régions enregistrés';
  actionFormulaire = 'Enregistrer';
  titreBoutonEdit = 'Modifier';
  titreBoutonDelete = 'Supprimer';
  messageEnregistrement = 'Enregistrement effectué avec succès!';
  erreurEnregistrement = 'Erreur enregistrement! Vérifier doublons ou connexion au serveur';


  listDepartement: DepartementM[];
  listDepartementForTries: DepartementM[];
  listRegions: RegionM[];
  listCommunes: CommuneM[];
  listCommunesForTrie: CommuneM[];


  listElements: ElementsFicheM[];
  nameFile = '';
  iDFile;

  currentRegion ;
  currentDepartement;
  currentCommune;
  currentCZV;
  currentVillage;
  currentLongitude;
  currentLaltitude;
  currentAltitude;
  currentUser;
  currentSaisieLe;
  currentSource;
  currentConfianceDonnees;


  //liste des type pametreges
  listLaboratoires: LaboratoiresM[] = [];
  listEspeces: EspecesM[] = [];
  listPathologies: PathologiesM[] = [];
  listNaturePrelevement: NaturePrelevementM[] = [];
  listTypeAnalyse: AnalyseLaboratoireM[] = [];
  listMaladies: MaladiesM[] = [];
  listOIE: OIEM[] = [];
  listSourceContamination: SourceContaminationM[] = [];
  listMesureControle: MesuresControleM[] = [];
  listTypeVaccin: TypeVaccinM[] = [];
  listTypeProduction: TypeProductionM[] = [];
  listSystemProduction: SystemProductionM[] = [];


  listCZV: CzvsModel[] = [];
  listCZVFinal: CzvsModel[] = [];


  listVillage: VillagesM[] = [];
  listVillageFinal: VillagesM[] = [];

  isvisible = false;


  constructor(private activateRoute: ActivatedRoute,
              private serviceElementFiche: ElementFicheService,
              private serviceAnwserQuestion: AnwserQuestionsService,
              private serviceRegion: RegionService,
              private serviceDepartement: DepartementService,
              private serviceCommune: CommuneService,
              private serviceLaoratire: LaboratoiresService,
              private serviceEspeces: EspecesService,
              private servicePathologie: PathologiesService,
              private serviceNaturePrelevement: NaturePrelevementService,
              private serviceTypeAnalyse: AnalyseLaboratoireService,
              private serviceMaladies: MaladiesService,
              private serviceOIE: OIEService,
              private serviceSourceContamination: SourceContaminationService,
              private serviceMesureControle: MesuresControleService,
              private serviceTypeVaccin: TypeVaccinService,
              private serviceTypeProduction: TypeProductionService,
              private serviceSystemProducion: SystemProductionService,
              private serviceCZV: CzvsService,
              private serviceVillage: VillagesService,
              public serviceNotification : NotificationsGeneralService,
              public modeApply : ModeProductionService) {
  }

  ngOnInit() {
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement élément fiche";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.chargeRegions();
    this.chargeArrondissement();
    this.chargeDepartement();
    this.chargeCZV();
    this.chargeVillage();
    this.chargeEspeces();
    this.chargeLaboratoires();
    this.chargeMaladies();
    this.chargeMesureControle();
    this.chargeNaturePrelevement();
    this.chargeOIE();
    this.chargePathologies();
    this.chargeSourceContamination();
    this.chargeSystemeProduction();
    this.chargeTypeAnalyse();
    this.chargeTypeProduction();
    this.chargeTypeVaccin();

    this.heading = 'Modification de données de la fiche :  ' + this.dataEnter.ficheCollecte.nomFiche;
    this.getAllElementOfFiche(this.dataEnter.ficheCollecte.id);

  }

  ngOnDestroy(): void {}

  chargeCZV() {
    this.serviceCZV.getCZVS().subscribe(
      (responce) => {
        this.listCZV = (<CzvsModel[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeVillage() {
    this.serviceVillage.getVillage().subscribe(
      (responce) => {
        this.listVillage = (<VillagesM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }


  chargeLaboratoires() {
    this.serviceLaoratire.getLaboratoire().subscribe(
      (responce) => {
        this.listLaboratoires = (<LaboratoiresM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeEspeces() {
    this.serviceEspeces.getEspece().subscribe(
      (responce) => {
        this.listEspeces = (<EspecesM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargePathologies() {
    this.servicePathologie.getPathologie().subscribe(
      (responce) => {
        this.listPathologies = (<PathologiesM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeNaturePrelevement() {
    this.serviceNaturePrelevement.getNaturePrelevement().subscribe(
      (responce) => {
        this.listNaturePrelevement = (<NaturePrelevementM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeTypeAnalyse() {
    this.serviceTypeAnalyse.getAnalyseLaboratoire().subscribe(
      (responce) => {
        this.listTypeAnalyse = (<AnalyseLaboratoireM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeMaladies() {
    this.serviceMaladies.getMaladie().subscribe(
      (responce) => {
        this.listMaladies = (<MaladiesM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeOIE() {
    this.serviceOIE.getOIE().subscribe(
      (responce) => {
        this.listOIE = (<OIEM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeSourceContamination() {
    this.serviceSourceContamination.getSourceContamination().subscribe(
      (responce) => {
        this.listSourceContamination = (<SourceContaminationM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeMesureControle() {
    this.serviceMesureControle.getMesuresControle().subscribe(
      (responce) => {
        this.listMesureControle = (<MesuresControleM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeTypeVaccin() {
    this.serviceTypeAnalyse.getAnalyseLaboratoire().subscribe(
      (responce) => {
        this.listTypeVaccin = (<TypeVaccinM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeTypeProduction() {
    this.serviceTypeProduction.getTypeProduction().subscribe(
      (responce) => {
        this.listTypeProduction = (<TypeProductionM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeSystemeProduction() {
    this.serviceSystemProducion.getSystemProduction().subscribe(
      (responce) => {
        this.listSystemProduction = (<SystemProductionM[]>responce);
      },
      (error) => {
        console.log(error)
      }
    )
  }


  getAllElementOfFiche(idSelectionFiche) {
    this.serviceElementFiche.getElementFicheID(idSelectionFiche).subscribe(
      (data) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        let elementInit: ElementsFicheM = new ElementsFicheM();
        let tempElement: ElementsFicheM[] = [];
        const tailleArray = (<ElementsFicheM[]>data).length;
        for (let i = 0; i < tailleArray; i++) {
          elementInit = new ElementsFicheM(
            data[i].id,
            data[i].labelChamp,
            data[i].labelChampEN,
            data[i].alias,
            data[i].typeChamp,
            data[i].cadreAffichage,
            data[i].propriete,
            data[i].ficheElementID,
            data[i].ficheCollecte
          );
          tempElement.push(elementInit);
        }

        let dataForFormatJSON : object = {};

       for (let itemKeyDataBrut in JSON.parse((this.dataEnter.reponseJson as string))) {
         let tempValuer = JSON.parse((this.dataEnter.reponseJson as string))[itemKeyDataBrut];
         if (itemKeyDataBrut.charAt(0) == "#" || itemKeyDataBrut.charAt(1) == "%") {
           if (itemKeyDataBrut.charAt(0) == "#" && itemKeyDataBrut.charAt(1) != "%") {
             itemKeyDataBrut = itemKeyDataBrut.slice(1);
           } else if (itemKeyDataBrut.charAt(1) == "%") {
             itemKeyDataBrut = itemKeyDataBrut.slice(2);
           }
         }
         dataForFormatJSON[itemKeyDataBrut] = tempValuer;
       }

      console.log("dataBrutForModif : ", dataForFormatJSON);
        let i = 0;
        for (let itemElementFiche of tempElement){
            tempElement[i].alias = dataForFormatJSON[itemElementFiche.labelChamp] || dataForFormatJSON[itemElementFiche.labelChampEN];
          i++;
        }

        this.currentCommune = dataForFormatJSON['Commune'];
        this.currentCZV = dataForFormatJSON['CZV'];
        this.currentDepartement = dataForFormatJSON['Departement'];
        this.currentRegion = dataForFormatJSON['Region'];
        this.currentVillage = dataForFormatJSON['Village'];
        this.currentLongitude = dataForFormatJSON['Longitude'];
        this.currentLaltitude = dataForFormatJSON['laltitude'];
        this.currentAltitude = dataForFormatJSON['altitude'];
        this.currentUser = dataForFormatJSON['Saisie par'];
        this.currentSaisieLe = dataForFormatJSON['Saisie le'];
        this.currentSource = dataForFormatJSON['Source'];
        this.currentConfianceDonnees = dataForFormatJSON['Confiance aux donnees'];


        this.listElements = tempElement;
        this.serviceNotification.openToast({
          titre : "Notification",
          message : "Chargement des elements de la fiche réussi!!",
          status : StatusNotification.SUCCESS});
      },
      (error) => {
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.serviceNotification.openToast({
          titre : "Notification",
          message : "Echec du chargement des éléments de la fiche",
          status : StatusNotification.ERROR});
        console.log(error);
      }
    )
  }

  onSaveContenuImpro(formProgramm: NgForm) {

    this.serviceNotification.configShowNotif.showModalBlock = true;

    let formatSave: AnwserQuestions = new AnwserQuestions(this.dataEnter.id, JSON.stringify(formProgramm.value), this.dataEnter.utilisateursCreate.email, this.dataEnter.ficheCollecte.id, this.dataEnter.programmation);
    this.serviceAnwserQuestion.updateAnwserQuestion(formatSave).subscribe(
      (reponse) => {
        this.serviceNotification.configShowNotif.showModalBlock = false;
        this.messageEnregistrement = 'La modification de votre donnée a été éffectue avec succes!';
        this.serviceNotification.swalSuccess({
          icon: StatusNotification.SUCCESS,
          title: "Modification éffectué avec succés!!",
          showConfirmButton: true
        });
        this.formProgramm.resetForm();
        //this.ngOnInit();
      },
      (error) => {
        this.serviceNotification.configShowNotif.showModalBlock = false;
        this.erreurEnregistrement = 'Echec de la modification, verifier votre connection avec le serveur!';
        this.serviceNotification.swalError({
          icon: StatusNotification.ERROR,
          title: "Echec de l'Opération",
          text: this.erreurEnregistrement
        });
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


  chargeRegions() {
    this.serviceRegion.getRegions().subscribe(
      (reponse) => {

        this.listRegions = (<RegionM[]>reponse);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeDepartement() {
    this.serviceDepartement.getDepartements().subscribe(
      (reponse) => {
        this.listDepartementForTries = (<DepartementM[]>reponse);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  chargeArrondissement() {
    this.serviceCommune.getCommunes().subscribe(
      (reponse) => {
        this.listCommunesForTrie = (<CommuneM[]>reponse);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  checkValueCommune(idCommune) {
    this.valeurCommune = this.listCommunes.find(element => element.id == idCommune).libelleCommuneFR;
    let tabCzv: CzvsModel[] = [];
    for (let itemCsv of this.listCZV) {
      if (itemCsv.arrondissement.id == idCommune) {
        tabCzv.push(itemCsv);
      }
    }
    this.listCZVFinal = tabCzv;
  }


  chooseDepartemen(idRegions) {

    this.valeurRegion = this.listRegions.find(element => element.id == idRegions).libelleRegionFR;
    this.serviceRegion.getAllDepartementByIdRegion(idRegions).subscribe(
      (reponse) => {
        this.listDepartement = (<DepartementM[]>reponse);
      },
      (error) => {
        console.log(error)
      }
    )
  }


  chooseCommune(idDepartement) {

    this.valeurDepartement = this.listDepartement.find(element => element.id == idDepartement).libelleDepartementFR;
    this.serviceDepartement.getAllCommuneByIdDepartement(idDepartement).subscribe(
      (reponse) => {
        this.listCommunes = (<CommuneM[]>reponse);
      },
      (error) => {
        console.log(error)
      }
    )
  }


  checkValueobjCZV(idCZV) {
    this.valeurCZV = this.listCZV.find(element => element.id == idCZV).libelleCZVSFR;
    let tabVillage: VillagesM[] = [];
    for (let itemVillage of this.listVillage) {
      if (itemVillage.czvsModel.id == idCZV) {
        tabVillage.push(itemVillage);
      }
    }
    this.listVillageFinal = tabVillage;
  }

  checkValueobjVillage(village) {
    this.valeurVillage = village;
  }

  onRetourne() {
    this.dataEnter = null;
    this.isReturn.emit(
      {isreturn: true}
    )
  }



}
