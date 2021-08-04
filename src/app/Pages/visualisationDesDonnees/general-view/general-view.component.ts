import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DepartementM} from '../../../Model/departementM';
import {CommuneM} from '../../../Model/CommuneM';
import {RegionM} from '../../../Model/RegionM';
import {AnwserQuestionsService} from '../../../Services/anwserQuestions/anwser-questions.service';
import {AnwserQuestions} from '../../../Model/anwserQuestions';
import {RegionService} from '../../../Services/Region/region.service';
import {DepartementService} from '../../../Services/Departement/departement.service';
import {CommuneService} from '../../../Services/Commune/commune.service';
import {ElementFicheService} from '../../../Services/elementFiche.service';
import {ElementsFicheM} from '../../../Model/ElementsFicheM';
import {NewPlanification} from '../../../Model/NewPlanification';
import {FicheCollecteM} from '../../../Model/FicheCollecteM';
import {NewPlannificationService} from '../../../Services/newPlannification/new-plannification.service';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {ModeProductionService, TypeModeAffichageIndiceStat} from '../../../PlatesFormes/mode-production.service';
// @ts-ignore
import * as $ from 'jquery';
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import defaultLanguage from "../../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../../assets/i18n/en.json";



export interface TypeInfoLegendeConfigAfficgeByFile {
  idFile : number;
  elementStatModeTaux? : string[];
  elementStatModePourcentage? : string[];
}

export const NBRE_ELEMENT_STAT = 3;


@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.css'],
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
export class GeneralViewComponent implements OnInit, OnDestroy {

  currentLangue = localStorage.getItem("langue");
  currentUser = localStorage.getItem("token");

  heading = 'Resultats des collectes d\'informations';
  subheading = 'Appercu général des donnees collectées sur le terrain selon leur région, département et communune';
  icon = 'pe-7s-bandaid icon-gradient bg-amy-crisp';
  public isCollapsed = true;
  public isCollapsedCommune = true;

  isvisible = false;
  dataNotFound = false;

  oh = false;

  currentfile: string = '';

  chart = {
    'caption': 'Vue global sur tout le Territoire  nationnal:' + this.currentfile,
    'numbersuffix': '',
    'includevalueinlabels': '1',
    'labelsepchar': ': ',
    'entityFillHoverColor': '#FFF9C4',
    'theme': 'fusion'
  };

  colorrange = {
    'minvalue': '0',
    'code': '#FFE0B2',
    'color': [
      {
        'minvalue': '1',
        'maxvalue': '49.0',
        'color': '#62f507'
      },
      {
        'minvalue': '50.0',
        'maxvalue': '150.0',
        'color': '#FB8C00'
      },
      {
        'minvalue': '150.0',
        'maxvalue': '10000000000.0',
        'color': '#E65100'
      }
    ]
  };

  showSelect = "";

  model = {
    left: true,
    middle: false,
    right: false
  };

  modelForActivationFiche = {
    left: false,
    middle: false,
    right: false
  };

  listDepartementalRestreint: DepartementM[] = [];
  listCommuneRestreint: CommuneM[] = [];

  dataSource: any = {'chart': {}, 'colorrange': {}, 'data': []};
  dataFinalesFOrStat: AnwserQuestions[] = [];
  dataFinalesFOrStatClone: AnwserQuestions[] = [];
  dataFinalesFOrStatRestreintByPlanning: AnwserQuestions[] = [];

  dataAsByFusioncharts: Array<any> = [];

  listregions: RegionM[] = [];
  listdepartement: DepartementM[] = [];
  listcommune: CommuneM[] = [];
  listDataForStat: AnwserQuestions[] = [];
  legendeAffichageCarte: String[] = [];
  legendeAffichageCarteForConfig: String[] = [];
  elementStatForSiteWeb: ElementsFicheM[] = [];
  isConfigIndicateurForSiteWeb = false;

  currentIdRegion: number = 0;

  filterrDateEnd = undefined;
  filterrDateStart = undefined;


  regionMoreTouchNumber = 0.0;
  departementMoreTouchNumber = 0.0;
  communeMoreTouchNumber = 0.0;

  regionMoreTouchLibelle = 'Aucun';
  departementMoreTouchLibelle = 'Aucun';
  communeMoreTouchLibelle = 'Aucun';

  elementStatGlobal: DepartementM[] = [];

  elementStatFicheDefault = '';
  elementStatFicheDefaultFromSon = '';

  @ViewChild("objview") toggle_content;
  @ViewChild("objDateStart") objDateStart : HTMLInputElement;
  @ViewChild("objDateEnd") objDateEnd : HTMLInputElement;
  @ViewChild("objPlanning") element_planning;
  @ViewChild("objfile") element_file;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;


  zoneEleve = "Zones plus élévées";

  isSelectElementDefault = true;

  listPlanning : NewPlanification[] = [];

  listFileTrie : FicheCollecteM[] = [];

  selectPlanning = "Sélection de la planification...";

  listAllDataValid : AnwserQuestions[] = [];


  messageEnregistrement='Enregistrement effectué avec succès!';
  messageEnregistrementEN='Enregistrement effectué avec succès! (EN)';

  erreurEnregistrement='Erreur enregistrement! Vérifier doublons ou connexion au serveur';
  erreurEnregistrementEN='Erreur enregistrement! Vérifier doublons ou connexion au serveur (EN)';


  mode;
  //mode = "ModePourcentage";



  configForElementStat : TypeInfoLegendeConfigAfficgeByFile[] = [];
  configForElementStatCloneForVisibilityApply : TypeInfoLegendeConfigAfficgeByFile[] = [];

  isConfigFiche = "DesactifConfigFiche";

  constructor(public serviceregion: RegionService,
              public servicedepartement: DepartementService,
              public servicecommune: CommuneService,
              public servicedonnevalide: AnwserQuestionsService,
              public serviceElement: ElementFicheService,
              public serviceProgrammation: NewPlannificationService,
              public serviceNotification : NotificationsGeneralService,
              public modalService: NgbModal,
              public serviceGeneral : ModeProductionService,
              private translate : TranslateService) {

    if (localStorage.getItem("langue")=="fr"){
      this.translate.setTranslation(`${localStorage.getItem("langue")}`, defaultLanguage);
      this.translate.use(`${localStorage.getItem("langue")}`);
    }
    if (localStorage.getItem("langue")=="en"){
      this.translate.setTranslation(`${localStorage.getItem("langue")}`, LanguageEN);
      this.translate.use(`${localStorage.getItem("langue")}`);
    }

    this.mode = this.serviceGeneral.MODE_AFFICHAGE;
    this.configForElementStat = localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)==null || localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)=="undefined" ? [] : ( JSON.parse(localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)) as TypeInfoLegendeConfigAfficgeByFile[]);

    servicedonnevalide.nbreNotificationDonneDajeEnvoyer();
    servicedonnevalide.nbreNotificationDonneRempli();
    servicedonnevalide.nbreNotificationDonneRecu();
  }



  ngOnInit() {
    this.loadElementFicheDefault();
    this.chargeRegion();
    this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours";
    this.initDonneevalid();
    this.chargeDepartement();
    this.chargeCommune();
    this.chargeAllDataValid();
  }

  ngOnDestroy(): void {}

  chargeAllDataValid(){
    this.servicedonnevalide.getAnwserQuestion().subscribe(
      (response)=>{
        this.listAllDataValid = ( response as AnwserQuestions[]);
      },
      (error)=>{
        console.log(error)
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des données validées, vérifier votre connection au serveur", status : StatusNotification.ERROR});;
      }
    )
  }



  onSearchByDate(dateStart, dateEnd,valPlaning, valFile) {
    this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours...";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.filterrDateStart = new Date(dateStart).getTime();
    this.filterrDateEnd = new Date(dateEnd).getTime();
    if (valPlaning==null && valFile==null){
      this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours";
      this.initDonneevalid("calcul");
      this.departmentWithDataStat();
      this.communeWithDataStat();
    }else{
      this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours";
      this.initDonneevalid("planning", this.dataFinalesFOrStat);
      this.departmentWithDataStat(undefined, this.dataFinalesFOrStat);
      this.communeWithDataStat(undefined, this.dataFinalesFOrStat);
    }
    this.serviceNotification.configShowNotif.showLoading.show = false;
  }

  onViewGeneral(valPlaning, valFile) {

    this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.filterrDateEnd = undefined;
    this.filterrDateStart = undefined;
    // @ts-ignore
    $('#dateEnd').val("");
    // @ts-ignore
    $('#dateStart').val("");
   /* // @ts-ignore
    $('#fileconcerne').val(null);
    // @ts-ignore
    $('#planning').val(null);*/

    if (valPlaning==null && valFile==null){
      this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours";
      this.initDonneevalid("calcul");
      this.departmentWithDataStat();
      this.communeWithDataStat();
    }else{
      this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours";
      this.initDonneevalid("planning", this.dataFinalesFOrStat);
      this.departmentWithDataStat(undefined, this.dataFinalesFOrStat);
      this.communeWithDataStat(undefined, this.dataFinalesFOrStat);
    }
  }

  loadElementFicheDefault() {
    this.serviceElement.allElementFicheDefault().subscribe(
      (response) => {
        if(response==null){
          this.isSelectElementDefault = false;
        }else {
          this.elementStatFicheDefault = (<ElementsFicheM>response).labelChamp;
          this.elementStatFicheDefaultFromSon = (<ElementsFicheM>response).ficheCollecte.nomFiche;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


  chargeDepartement() {
    this.servicedepartement.getDepartements().subscribe(
      (reponse) => {
        let tempDepartement: DepartementM[] = [];
        const tailleArray = (<DepartementM[]>reponse).length;
        let departmentInit: DepartementM = new DepartementM();
        for (let i = 0; i < tailleArray; i++) {
          departmentInit = new DepartementM(
            reponse[i].id,
            reponse[i].codeDepartement,
            reponse[i].libelleDepartementEN,
            reponse[i].libelleDepartementEN,
            reponse[i].regionDepartement,
            reponse[i].region,
            []
          );
          tempDepartement.push(departmentInit);
        }
        this.listdepartement = [];
        this.listdepartement = tempDepartement;
        this.elementStatGlobal = tempDepartement;
      },
      (error) => {
        console.log(error);
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des départements, verifier votre connection au serveur", status : StatusNotification.ERROR});
      }
    );
  }

  chargeRegion() {
    this.serviceregion.getRegions().subscribe(
      (reponse) => {
        const tailleArray = (<RegionM[]>reponse).length;
        let regionInit: RegionM = new RegionM();
        for (let i = 0; i < tailleArray; i++) {
          regionInit = new RegionM(
            reponse[i].id,
            reponse[i].codeRegion,
            reponse[i].libelleRegionFR,
            reponse[i].libelleRegionEN,
            []
          );
          this.listregions.push(regionInit);
        }

      },
      (error) => {
        console.log(error);
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des Régions, verifier votre connection au serveur", status : StatusNotification.ERROR});
      }
    );
  }


  chargeCommune() {
    this.servicecommune.getCommunes().subscribe(
      (reponse) => {

        let tempCommune: CommuneM[] = [];
        const tailleArray = (<CommuneM[]>reponse).length;
        let communeInit: CommuneM = new CommuneM();
        for (let i = 0; i < tailleArray; i++) {
          communeInit = new CommuneM(
            reponse[i].id,
            reponse[i].codeCommune,
            reponse[i].libelleCommuneFR,
            reponse[i].libelleCommuneEN,
            reponse[i].departementCommune,
            reponse[i].departement,
            []
          );
          tempCommune.push(communeInit);
        }
        this.listcommune = [];
        this.listcommune = tempCommune;
      },
      (error) => {
        console.log(error);
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des Communes, verifier votre connection au serveur", status : StatusNotification.ERROR});
      }
    );
  }


  initDonneevalid(status? : string, donneeValidFortrie?: AnwserQuestions[]) {

    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.servicedonnevalide.getAllAnwserQuestionsofFileByDefault().subscribe(
      (reponse) => {




        this.listDataForStat = (<AnwserQuestions[]>reponse).length == 0 ? ( donneeValidFortrie == undefined ? [] : donneeValidFortrie ) : (<AnwserQuestions[]>reponse);


        if (this.listDataForStat.length > 0) {
          if (status!="planning"){
            this.legendeAffichageCarte = [];
            this.dataFinalesFOrStat = [];
            this.dataFinalesFOrStatClone = [];

            for (let data of this.listDataForStat) {

              let databrut = JSON.parse((<string>data.reponseJson));
              let databrutJSON: String[] = Object.keys(databrut);
              let y = 0;
              let z = 0;
              for (let i = 0; i < databrutJSON.length; i++) {
                let separelabelData = Object.assign([], databrutJSON[i]);
                if (databrutJSON[i] == 'Region') {
                  y++;
                }
                if (separelabelData[0] == '#') {
                  if (this.mode == TypeModeAffichageIndiceStat.MODE_TAUX && separelabelData[1] != '%'){
                    z++;
                    let valeurretour = this.legendeAffichageCarte.find((element) => element == databrutJSON[i]);

                    if (valeurretour == undefined) {
                      this.legendeAffichageCarte.push(databrutJSON[i]);
                    }
                  }
                  if (this.mode == TypeModeAffichageIndiceStat.MODE_POURCENTAGE && separelabelData[1] == '%'){
                    z++;
                    let valeurretour = this.legendeAffichageCarte.find((element) => element == databrutJSON[i]);
                    if (valeurretour == undefined) {
                      this.legendeAffichageCarte.push(databrutJSON[i]);
                    }
                  }
                }
              }
              if (y > 0 && z > 0) {
                this.dataFinalesFOrStat.push(data);
              }
            }


            if (this.legendeAffichageCarte.length>0 && this.dataFinalesFOrStat.length>0){
              let valLocalStorageConfig : undefined | TypeInfoLegendeConfigAfficgeByFile[] = localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)!=null ? (localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)=="undefined" ? undefined : JSON.parse(localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)) ) : undefined;
              let ficheCurrentFormConfig : TypeInfoLegendeConfigAfficgeByFile = valLocalStorageConfig!=undefined ? valLocalStorageConfig.find(element=>element.idFile==this.dataFinalesFOrStat[0].ficheCollecte.id) : undefined;

              let cloneLegendeForConfig =   Object.assign([], this.legendeAffichageCarte, []);
              if (valLocalStorageConfig==undefined || valLocalStorageConfig.length==0 || ficheCurrentFormConfig==undefined){
                this.legendeAffichageCarte = [];
                this.legendeAffichageCarte = cloneLegendeForConfig.slice(0, NBRE_ELEMENT_STAT);
              }else{

                if(this.mode==TypeModeAffichageIndiceStat.MODE_TAUX){
                  this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModeTaux.length==0 ? ( this.legendeAffichageCarte.length>0 ? [...this.legendeAffichageCarte] : [] ) : ficheCurrentFormConfig.elementStatModeTaux;
                  if (this.legendeAffichageCarte.length==0){
                    this.serviceNotification.openToast({
                      titre : 'Notification',
                      message : "Désolé, aucune donnée indice taux n'a été trouvé dans la configuration de cette fiche par défaut",
                      status : StatusNotification.WARNING
                    });
                    this.isvisible = true;
                  }
                }else{
                  this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModePourcentage.length==0 ? ( this.legendeAffichageCarte.length>0 ? [...this.legendeAffichageCarte] : [] ) : ficheCurrentFormConfig.elementStatModePourcentage;
                  if (this.legendeAffichageCarte.length==0){
                    this.serviceNotification.openToast({
                      titre : 'Notification',
                      message : "Désolé, aucune donnée indice pourcentage n'a été trouvé dans la configuration de cette fiche par défaut",
                      status : StatusNotification.WARNING
                    });
                    this.isvisible = true;
                  }
                }

              }
            }
            this.currentfile = this.listDataForStat[0].ficheCollecte.nomFiche;
          }



          if (this.zoneEleve=="Masquer Zone Elévée" &&  this.legendeAffichageCarte.length==0 &&  this.dataFinalesFOrStat.length==0){
            this.toggle_content.nativeElement.classList.remove("is-visible");
            this.zoneEleve = "Zones plus élévées";
          }

          if (donneeValidFortrie!=undefined){
            this.dataFinalesFOrStat = [];
            this.dataFinalesFOrStat = donneeValidFortrie;
          }

          for (let itemregion of this.listregions) {
            itemregion.donnee = [];
            let taux: number = 0;
            let itemReady = {'id': '', 'value': '', 'showLabel': ''};
            let getData: AnwserQuestions[] = [];
            for (let itemdatafinal of this.dataFinalesFOrStat) {
              let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
              if (itemregion.libelleRegionFR == itemdataJSON.Region) {
                if (this.filterrDateStart != undefined && this.filterrDateEnd != undefined) {
                  let dateFilterData = new Date(itemdatafinal.create_le.toString().split('T')[0]).getTime();
                  if (this.filterrDateStart <= dateFilterData && dateFilterData <= this.filterrDateEnd) {
                    getData.push(itemdatafinal);
                  }
                } else {
                  getData.push(itemdatafinal);
                }
              }
            }
            let Z = 1;
            if (getData.length >= 1) {
              for (let itemdatafinal of getData) {
                let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
                // @ts-ignore
                taux += parseFloat(itemdataJSON[this.legendeAffichageCarte[this.legendeAffichageCarte.length - 1]]);

                for (let y = 0; y < this.legendeAffichageCarte.length; y++) {
                  if (itemregion.donnee.length <= 0) {

                    itemregion.donnee.push({
                      'label': this.legendeAffichageCarte[y],
                      // @ts-ignore
                      'taux': parseFloat(itemdataJSON[this.legendeAffichageCarte[y]])
                    });
                  } else {
                    let cloneItemregion = [].concat(itemregion.donnee).length;

                    let verifie = false;
                    let index = null;
                    for (let valToCompar = 0; valToCompar < cloneItemregion; valToCompar++) {
                      if (this.legendeAffichageCarte[y] == itemregion.donnee[valToCompar].label) {
                        verifie = true;
                        index = valToCompar;
                      }
                    }
                    if (verifie == true) {

                      // @ts-ignore
                      itemregion.donnee[index].taux += parseFloat(itemdataJSON[this.legendeAffichageCarte[y]]);
                    }
                    if (verifie == false) {

                      itemregion.donnee.push({
                        'label': this.legendeAffichageCarte[y],
                        // @ts-ignore
                        'taux': parseFloat(itemdataJSON[this.legendeAffichageCarte[y]])
                      });
                    }
                  }
                }
              }

            } else {
              for (let y = 0; y < this.legendeAffichageCarte.length; y++) {
                if (itemregion.donnee.length <= 0) {
                  // @ts-ignore
                  itemregion.donnee.push({'label': this.legendeAffichageCarte[y], 'taux': 0});
                } else {
                  let cloneItemregion2 = [].concat(itemregion.donnee).length;

                  let verifie2 = false;
                  let index2 = null;
                  for (let valToCompar = 0; valToCompar < cloneItemregion2; valToCompar++) {
                    if (this.legendeAffichageCarte[y] == itemregion.donnee[valToCompar].label) {
                      verifie2 = true;
                      index2 = valToCompar;
                    }
                  }
                  if (verifie2 == false) {
                    // @ts-ignore
                    itemregion.donnee.push({'label': this.legendeAffichageCarte[y], 'taux': 0});
                  }
                }
              }
            }

            if (this.mode == TypeModeAffichageIndiceStat.MODE_POURCENTAGE){
              for (let itemDataInRegion of itemregion.donnee){

                itemDataInRegion.taux = itemDataInRegion.taux==0 ? 0.0 : ((itemDataInRegion.taux as number)/getData.length).toFixed(2);
              }
              //itemReady.value = (taux/getData.length).toFixed(2).toString()+"%";
              itemReady.value =  taux.toString();
            }else{
              itemReady.value = taux.toString();
            }

            itemReady.id = itemregion.codeRegion;
            itemReady.showLabel = '1';
            this.dataAsByFusioncharts.push(itemReady);


          }


          this.chart.caption = 'Vue globale sur tout le térritoire nationnal de la collecte  : ' + this.currentfile;
          this.dataSource.chart = this.chart;
          this.dataSource.colorrange = this.colorrange;
          this.dataSource.data = this.dataAsByFusioncharts;

          if (status=="calcul" || status=="planning"){
            let tempStatRegionDefault: any;
            let regionCompareNumber = this.listregions[0].donnee.find(element => (element.label as string).replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%', '').trim() == this.elementStatFicheDefault);
            if(regionCompareNumber==undefined){
              regionCompareNumber = this.listregions[0].donnee.find(element => (element.label as string).replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%', '').trim() == this.legendeAffichageCarte[0].replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%', '').trim());
            }
            tempStatRegionDefault = {region: this.listregions[0].libelleRegionFR, taux: regionCompareNumber.taux};
            for (let y = 0; y < this.listregions.length; y++) {
              let tempRegionCompareNumber = this.listregions[y].donnee.find(element => (element.label as string).replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%', '').trim() == this.elementStatFicheDefault);
              if (tempRegionCompareNumber==undefined){
                tempRegionCompareNumber = this.listregions[y].donnee.find(element => (element.label as string).replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%', '').trim() == this.legendeAffichageCarte[0].replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%', '').trim());
              }
              tempStatRegionDefault = (tempStatRegionDefault.taux as number) >= (tempRegionCompareNumber.taux as number) ? tempStatRegionDefault : {
                region: this.listregions[y].libelleRegionFR,
                taux: tempRegionCompareNumber.taux
              };
            }
            this.regionMoreTouchNumber = tempStatRegionDefault.taux;
            this.regionMoreTouchLibelle = tempStatRegionDefault.region;

            let idRegion = this.listregions.find(element => element.libelleRegionFR == this.regionMoreTouchLibelle).id;
          }
        }
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.dataNotFound = true;
      },
      (error) => {
        console.log(error);
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.dataNotFound = true;
        this.serviceNotification.openToast({titre : "Notification", message : "Aucune données trouvées, verifier votre connection au serveur", status : StatusNotification.ERROR});
      }
    );
  }


  departmentWithDataStat(idRegion?,donneeValidFortrie?) {

    if (this.legendeAffichageCarte.length==0){

      if (donneeValidFortrie==undefined){

        this.dataFinalesFOrStat = [];

        for (let data of this.listDataForStat) {
          let databrut = JSON.parse((<string>data.reponseJson));
          let databrutJSON: String[] = Object.keys(databrut);
          let y = 0;
          let z = 0;
          for (let i = 0; i < databrutJSON.length; i++) {
            let separelabelData = Object.assign([], databrutJSON[i]);
            if (databrutJSON[i] == 'Region') {
              y++;
            }

            if (separelabelData[0] == '#') {
              if (this.mode == TypeModeAffichageIndiceStat.MODE_TAUX && separelabelData[1] != '%'){
                z++;
                let valeurretour = this.legendeAffichageCarte.find((element) => element == databrutJSON[i]);

                if (valeurretour == undefined) {
                  this.legendeAffichageCarte.push(databrutJSON[i]);
                }
              }
              if (this.mode == TypeModeAffichageIndiceStat.MODE_POURCENTAGE && separelabelData[1] == '%'){
                z++;
                let valeurretour = this.legendeAffichageCarte.find((element) => element == databrutJSON[i]);
                if (valeurretour == undefined) {
                  this.legendeAffichageCarte.push(databrutJSON[i]);
                }
              }
            }
          }
          if (y > 0 && z > 0) {
            this.dataFinalesFOrStat.push(data);
          }
        }

        if (this.legendeAffichageCarte.length>0 && this.dataFinalesFOrStat.length>0){
          let valLocalStorageConfig : undefined | TypeInfoLegendeConfigAfficgeByFile[] = localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)!=null || localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)!="undefined" ? JSON.parse(localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)) : undefined;
          let ficheCurrentFormConfig : TypeInfoLegendeConfigAfficgeByFile = valLocalStorageConfig!=undefined ? valLocalStorageConfig.find(element=>element.idFile==this.dataFinalesFOrStat[0].ficheCollecte.id) : undefined;
          let cloneLegendeForConfig =   Object.assign([], this.legendeAffichageCarte, []);
          if (valLocalStorageConfig==undefined || valLocalStorageConfig.length==0 || ficheCurrentFormConfig==undefined){
            this.legendeAffichageCarte = [];
            this.legendeAffichageCarte = cloneLegendeForConfig.slice(0, NBRE_ELEMENT_STAT);
          }else{
            if(this.mode==TypeModeAffichageIndiceStat.MODE_TAUX){
              this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModeTaux;
            }else{
              this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModePourcentage;
            }
          }
        }
     }
    }

    if (donneeValidFortrie!=undefined){
      this.dataFinalesFOrStat = [];
      this.dataFinalesFOrStat = donneeValidFortrie;
    }

    if (idRegion == this.currentIdRegion && this.listDepartementalRestreint.length > 0) {

      this.listDepartementalRestreint = [];

    } else {

      let listDepartementClone = [].concat(this.listdepartement);
      let tempAllDepartment: DepartementM[] = [];

      let departmenentsParcourt: DepartementM[] = [];

      if (idRegion==undefined){
        departmenentsParcourt = listDepartementClone;
      }else {
        for (let itemDepartment of listDepartementClone) {
          if (itemDepartment.region.id == idRegion) {
            departmenentsParcourt.push(itemDepartment);
          }
        }
      }

      for (let itemDepartementParcourt of departmenentsParcourt) {
        itemDepartementParcourt.donnee = [];
        let dataImportant: Array<any | { 'label': '', 'taux': any }> = [];
        let tabData: any[] = [];

        let getDataDemartement: AnwserQuestions[] = [];
        for (let itemdatafinalDepartement of this.dataFinalesFOrStat) {
          let itemdataJSONDepartement = JSON.parse((<string>itemdatafinalDepartement.reponseJson));
          if (itemDepartementParcourt.libelleDepartementFR == itemdataJSONDepartement.Departement) {
            if (this.filterrDateStart != undefined && this.filterrDateEnd != undefined) {
              let dateFilterData = new Date(itemdatafinalDepartement.create_le.toString().split('T')[0]).getTime();
              if (this.filterrDateStart <= dateFilterData && dateFilterData <= this.filterrDateEnd) {
                getDataDemartement.push(itemdatafinalDepartement);
              }
            } else {
              getDataDemartement.push(itemdatafinalDepartement);
            }
          }
        }

        if (getDataDemartement.length >= 1) {

          itemDepartementParcourt.donnee = [];

          for (let itemdatafinalDepartement2 of getDataDemartement) {
            let itemdataJSONDEpartement2 = JSON.parse((<string>itemdatafinalDepartement2.reponseJson));
            // @ts-ignore

            for (let y = 0; y < this.legendeAffichageCarte.length; y++) {
              if (itemDepartementParcourt.donnee.length == 0) {

                // @ts-ignore
                let taux: number = parseFloat(itemdataJSONDEpartement2[this.legendeAffichageCarte[y]]);

                // @ts-ignore
                itemDepartementParcourt.donnee.push({
                  'label': this.legendeAffichageCarte[y],
                  'taux': taux
                });

                // @ts-ignore
              } else {
                let cloneItemDepartement2 = [].concat(itemDepartementParcourt.donnee).length;
                let verifieDepartement = false;
                let indexDepartement = null;
                for (let valToComparDepartement = 0; valToComparDepartement < cloneItemDepartement2; valToComparDepartement++) {
                  if (this.legendeAffichageCarte[y] == itemDepartementParcourt.donnee[valToComparDepartement].label) {
                    verifieDepartement = true;
                    indexDepartement = valToComparDepartement;
                  }
                }
                if (verifieDepartement == true) {
                  // @ts-ignore
                  itemDepartementParcourt.donnee[indexDepartement].taux += parseFloat(itemDepartementParcourt[this.legendeAffichageCarte[y]]);
                }
                if (verifieDepartement == false) {

                  itemDepartementParcourt.donnee.push({
                    'label': this.legendeAffichageCarte[y],
                    // @ts-ignore
                    'taux': parseFloat(itemdataJSONDEpartement2[this.legendeAffichageCarte[y]])
                  });
                }

              }
            }
            tabData.push(Object.assign({}, itemDepartementParcourt.donnee, {}));
            itemDepartementParcourt.donnee = [];
          }
        } else {
          for (let y = 0; y < this.legendeAffichageCarte.length; y++) {
            if (itemDepartementParcourt.donnee.length <= 0) {
              // @ts-ignore
              itemDepartementParcourt.donnee.push({'label': this.legendeAffichageCarte[y], 'taux': 0});
            } else {
              let cloneItemDepartement3 = [].concat(itemDepartementParcourt.donnee).length;

              let verifieDepartement2 = false;
              let indexDepartement2 = null;
              for (let valToComparDepartement3 = 0; valToComparDepartement3 < cloneItemDepartement3; valToComparDepartement3++) {
                if (this.legendeAffichageCarte[y] == itemDepartementParcourt.donnee[valToComparDepartement3].label) {
                  verifieDepartement2 = true;
                  indexDepartement2 = valToComparDepartement3;
                }
              }

              if (verifieDepartement2 == false) {
                // @ts-ignore
                itemDepartementParcourt.donnee.push({'label': this.legendeAffichageCarte[y], 'taux': 0});
              }
            }
          }

          tabData.push(Object.assign({}, itemDepartementParcourt.donnee, {}));
          itemDepartementParcourt.donnee = [];

        }
        //getDataDemartement
        let tauxTotal : any  = 0;
        for (let itemLegend of this.legendeAffichageCarte) {
          for (let itemDataEncap of tabData) {
            for (let lastItemData of Object.assign([], itemDataEncap, [])) {
              if (itemLegend == lastItemData.label) {
                tauxTotal += lastItemData.taux;
              }
            }
          }


          if (this.mode == TypeModeAffichageIndiceStat.MODE_POURCENTAGE){
              tauxTotal = (tauxTotal as number)==0 ? tauxTotal : ((tauxTotal as number)/getDataDemartement.length).toFixed(2);
          }

          dataImportant.push({'label': itemLegend, 'taux': tauxTotal});
          tauxTotal = 0;
        }
        itemDepartementParcourt.donnee = dataImportant;
        tempAllDepartment.push(itemDepartementParcourt);
      }

      if (idRegion!=undefined){
        this.isCollapsed = !this.isCollapsed;

        this.currentIdRegion = idRegion;

        this.listDepartementalRestreint = [];
        this.listDepartementalRestreint = tempAllDepartment;
      }

      if (idRegion==undefined){

        let tempStatRegionDefaultDepartement: any;


        let regionCompareNumberDepartement = tempAllDepartment[0].donnee.find(element => (element.label as string).replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%', '').trim() == this.elementStatFicheDefault);


        if (regionCompareNumberDepartement==undefined){
          regionCompareNumberDepartement = tempAllDepartment[0].donnee.find(element => (element.label as string).replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%', '').trim() == this.legendeAffichageCarte[0].replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%', '').trim());
        }

        tempStatRegionDefaultDepartement = {
          departement: tempAllDepartment[0].libelleDepartementFR,
          taux: regionCompareNumberDepartement.taux
        };


        for (let z = 0; z < tempAllDepartment.length; z++) {
          let tempRegionCompareNumber = tempAllDepartment[z].donnee.find(element => (element.label as string).replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%', '').trim() == this.elementStatFicheDefault);
          if (tempRegionCompareNumber==undefined){
             tempRegionCompareNumber = tempAllDepartment[z].donnee.find(element => (element.label as string).replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%', '').trim() == this.legendeAffichageCarte[0].replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%', '').trim());
          }
          tempStatRegionDefaultDepartement = parseFloat(tempStatRegionDefaultDepartement.taux) >= parseFloat(tempRegionCompareNumber.taux) ? tempStatRegionDefaultDepartement : {
            departement: tempAllDepartment[z].libelleDepartementFR,
            taux: tempRegionCompareNumber.taux
          };

        }
        this.departementMoreTouchNumber = tempStatRegionDefaultDepartement.taux;
        this.departementMoreTouchLibelle = tempStatRegionDefaultDepartement.departement;
      }
    }
  }


  showOtherLegence(valeurLegende: String) {
    this.dataAsByFusioncharts = [];
    for (let itemregion of this.listregions) {
      let taux: number = 0;
      let itemReady = {'id': '', 'value': '', 'showLabel': ''};

      for (let itemdatafinal of this.dataFinalesFOrStat) {
        let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
        if (itemregion.libelleRegionFR == itemdataJSON.Region) {

          if (this.filterrDateStart != undefined && this.filterrDateEnd != undefined) {
            let dateFilterData = new Date(itemdatafinal.create_le.toString().split('T')[0]).getTime();
            if (this.filterrDateStart <= dateFilterData && dateFilterData <= this.filterrDateEnd) {
              // @ts-ignore
              taux += parseFloat(itemdataJSON[valeurLegende]);
            }
          } else {
            // @ts-ignore
            taux += parseFloat(itemdataJSON[valeurLegende]);
          }
        }
      }
      itemReady.id = itemregion.codeRegion;
      itemReady.value = taux.toString();
      itemReady.showLabel = '1';
      this.dataAsByFusioncharts.push(itemReady);
    }
    this.dataSource.chart = this.chart;
    this.dataSource.colorrange = this.colorrange;
    this.dataSource.data = this.dataAsByFusioncharts;
  }


  onChoiseLegende(valeurOflegendeCurrent) {
    this.showOtherLegence(valeurOflegendeCurrent.value);
  }


  communeWithDataStat(idDeparrtement?, donneeValidFortrie?) {

    if (this.legendeAffichageCarte.length==0){

      if (donneeValidFortrie==undefined){

        this.dataFinalesFOrStat = [];

        for (let data of this.listDataForStat) {
          let databrut = JSON.parse((<string>data.reponseJson));
          let databrutJSON: String[] = Object.keys(databrut);
          let y = 0;
          let z = 0;
          for (let i = 0; i < databrutJSON.length; i++) {
            let separelabelData = Object.assign([], databrutJSON[i]);
            if (databrutJSON[i] == 'Region') {
              y++;
            }

            if (separelabelData[0] == '#') {
              if (this.mode == TypeModeAffichageIndiceStat.MODE_TAUX && separelabelData[1] != '%'){
                z++;
                let valeurretour = this.legendeAffichageCarte.find((element) => element == databrutJSON[i]);

                if (valeurretour == undefined) {
                  this.legendeAffichageCarte.push(databrutJSON[i]);
                }
              }
              if (this.mode == TypeModeAffichageIndiceStat.MODE_POURCENTAGE && separelabelData[1] == '%'){
                z++;
                let valeurretour = this.legendeAffichageCarte.find((element) => element == databrutJSON[i]);
                if (valeurretour == undefined) {
                  this.legendeAffichageCarte.push(databrutJSON[i]);
                }
              }
            }
          }
          if (y > 0 && z > 0) {
            this.dataFinalesFOrStat.push(data);
          }
        }

        if (this.legendeAffichageCarte.length>0 && this.dataFinalesFOrStat.length>0){
          let valLocalStorageConfig : undefined | TypeInfoLegendeConfigAfficgeByFile[] = localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)!=null || localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)!="undefined" ? JSON.parse(localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)) : undefined;
          let ficheCurrentFormConfig : TypeInfoLegendeConfigAfficgeByFile = valLocalStorageConfig!=undefined ? valLocalStorageConfig.find(element=>element.idFile==this.dataFinalesFOrStat[0].ficheCollecte.id) : undefined;
          let cloneLegendeForConfig =   Object.assign([], this.legendeAffichageCarte, []);
          if (valLocalStorageConfig==undefined || valLocalStorageConfig.length==0 || ficheCurrentFormConfig==undefined){
            this.legendeAffichageCarte = [];
            this.legendeAffichageCarte = cloneLegendeForConfig.slice(0, NBRE_ELEMENT_STAT);
          }else{
            if(this.mode==TypeModeAffichageIndiceStat.MODE_TAUX){
              this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModeTaux;
            }else{
              this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModePourcentage;
            }
          }
        }
      }
    }

    if (donneeValidFortrie!=undefined){
      this.dataFinalesFOrStat = [];
      this.dataFinalesFOrStat = donneeValidFortrie;
    }

    let listCommuneClone = [].concat(this.listcommune);
    let tempAllCommune: CommuneM[] = [];

    let communesParcourt: CommuneM[] = listCommuneClone;

    for (let itemCommuneParcourt of communesParcourt) {
      itemCommuneParcourt.donnee = [];

      let dataImportant: Array<any | { 'label': '', 'taux': any }> = [];
      let tabData: any[] = [];

      let getDataCommune: AnwserQuestions[] = [];
      for (let itemdatafinalCommune of this.dataFinalesFOrStat) {
        let itemdataJSONCommune = JSON.parse((<string>itemdatafinalCommune.reponseJson));
        if (itemCommuneParcourt.libelleCommuneFR == itemdataJSONCommune.Commune) {
          if (this.filterrDateStart != undefined && this.filterrDateEnd != undefined) {
            let dateFilterData = new Date(itemdatafinalCommune.create_le.toString().split('T')[0]).getTime();
            if (this.filterrDateStart <= dateFilterData && dateFilterData <= this.filterrDateEnd) {
              getDataCommune.push(itemdatafinalCommune);
            }
          } else {
            getDataCommune.push(itemdatafinalCommune);
          }
        }
      }

      if (getDataCommune.length >= 1) {

        itemCommuneParcourt.donnee = [];

        for (let itemdatafinalComune2 of getDataCommune) {
          let itemdataJSONCommune2 = JSON.parse((<string>itemdatafinalComune2.reponseJson));
          // @ts-ignore

          for (let y = 0; y < this.legendeAffichageCarte.length; y++) {
            if (itemCommuneParcourt.donnee.length == 0) {

              // @ts-ignore
              let taux: number = parseFloat(itemdataJSONCommune2[this.legendeAffichageCarte[y]]);

              // @ts-ignore
              itemCommuneParcourt.donnee.push({
                'label': this.legendeAffichageCarte[y],
                'taux': taux
              });

              // @ts-ignore
            } else {
              let cloneItemCommune2 = [].concat(itemCommuneParcourt.donnee).length;
              let verifieCommune = false;
              let indexCommune = null;
              for (let valToComparCommune = 0; valToComparCommune < cloneItemCommune2; valToComparCommune++) {
                if (this.legendeAffichageCarte[y] == itemCommuneParcourt.donnee[valToComparCommune].label) {
                  verifieCommune = true;
                  indexCommune = valToComparCommune;
                }
              }
              if (verifieCommune == true) {
                // @ts-ignore
                itemCommuneParcourt.donnee[indexCommune].taux += parseFloat(itemCommuneParcourt[this.legendeAffichageCarte[y]]);
              }
              if (verifieCommune == false) {
                itemCommuneParcourt.donnee.push({
                  'label': this.legendeAffichageCarte[y],
                  // @ts-ignore
                  'taux': parseFloat(itemdataJSONCommune2[this.legendeAffichageCarte[y]])
                });
              }
            }
          }
          tabData.push(Object.assign({}, itemCommuneParcourt.donnee, {}));
          itemCommuneParcourt.donnee = [];
        }
      } else {
        for (let y = 0; y < this.legendeAffichageCarte.length; y++) {
          if (itemCommuneParcourt.donnee.length <= 0) {
            // @ts-ignore
            itemCommuneParcourt.donnee.push({'label': this.legendeAffichageCarte[y], 'taux': 0});
          } else {
            let cloneItemCommune3 = [].concat(itemCommuneParcourt.donnee).length;

            let verifieCommune2 = false;
            let indexDepartement2 = null;
            for (let valToComparDepartement3 = 0; valToComparDepartement3 < cloneItemCommune3; valToComparDepartement3++) {
              if (this.legendeAffichageCarte[y] == itemCommuneParcourt.donnee[valToComparDepartement3].label) {
                verifieCommune2 = true;
                indexDepartement2 = valToComparDepartement3;
              }
            }
            if (verifieCommune2 == false) {
              // @ts-ignore
              itemCommuneParcourt.donnee.push({'label': this.legendeAffichageCarte[y], 'taux': 0});
            }
          }
        }
        tabData.push(Object.assign({}, itemCommuneParcourt.donnee, {}));
        itemCommuneParcourt.donnee = [];
      }
      let tauxTotal: any = 0;
      for (let itemLegend of this.legendeAffichageCarte) {
        for (let itemDataEncap of tabData) {
          for (let lastItemData of Object.assign([], itemDataEncap, [])) {
            if (itemLegend == lastItemData.label) {
              tauxTotal += lastItemData.taux;
            }
          }
        }

        if (this.mode == TypeModeAffichageIndiceStat.MODE_POURCENTAGE){
          tauxTotal = (tauxTotal as number)==0 ? tauxTotal : ((tauxTotal as number)/getDataCommune.length).toFixed(2);
        }


        dataImportant.push({'label': itemLegend, 'taux': tauxTotal});
        tauxTotal = 0;
      }
      itemCommuneParcourt.donnee = dataImportant;
      tempAllCommune.push(itemCommuneParcourt);
    }
    this.listCommuneRestreint = [];
    this.listCommuneRestreint = tempAllCommune;

    let tempStatDepartementDefaultCommune : any;
    if (this.listcommune.length>0){
      let departementCompareNumberCommune = tempAllCommune[0].donnee.find( element => (element.label as string).replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%',"").trim()  == this.elementStatFicheDefault);
      if(departementCompareNumberCommune==undefined){
        departementCompareNumberCommune = tempAllCommune[0].donnee.find( element => (element.label as string).replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%',"").trim()  == this.legendeAffichageCarte[0].replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%',"").trim());
      }
      tempStatDepartementDefaultCommune =  {departement : tempAllCommune[0].libelleCommuneFR, taux : departementCompareNumberCommune.taux};
      for (let z=0; z < tempAllCommune.length; z++){
        let tempCommuneCompareNumber = tempAllCommune[z].donnee.find( element => (element.label as string).replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%',"").trim()  == this.elementStatFicheDefault);
        if(tempCommuneCompareNumber==undefined){
          tempCommuneCompareNumber = tempAllCommune[z].donnee.find( element => (element.label as string).replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%',"").trim()  ==  this.legendeAffichageCarte[0].replace(this.mode == TypeModeAffichageIndiceStat.MODE_TAUX ? '#' : '#%',"").trim());
        }

        tempStatDepartementDefaultCommune = parseFloat(tempStatDepartementDefaultCommune.taux) >= parseFloat(tempCommuneCompareNumber.taux) ? tempStatDepartementDefaultCommune :  {departement : tempAllCommune[z].libelleCommuneFR, taux:tempCommuneCompareNumber.taux };
      }
      this.communeMoreTouchNumber = tempStatDepartementDefaultCommune.taux;
      this.communeMoreTouchLibelle = tempStatDepartementDefaultCommune.departement;
    }

  }


  onElementsMoreLevel(valPlaning, valFile){
    this.serviceNotification.configShowNotif.showLoading.text = "Calcul encour";
    if (this.zoneEleve=="Masquer Zone Elévée"){
      this.toggle_content.nativeElement.classList.remove("is-visible");
      this.zoneEleve = "Zones plus élévées";
    }else{
      if (valPlaning==null && valFile==null){
        this.initDonneevalid("calcul")
        this.departmentWithDataStat();
        this.communeWithDataStat();
      }else{
        this.initDonneevalid("planning", this.dataFinalesFOrStat)
        this.departmentWithDataStat(undefined, this.dataFinalesFOrStat);
        this.communeWithDataStat(undefined, this.dataFinalesFOrStat);
        this.serviceNotification.configShowNotif.showLoading.show = false;
      }
      this.toggle_content.nativeElement.classList.add("is-visible");
      this.zoneEleve = "Masquer Zone Elévée";
    }

  }

  onChangeIndice(indice : string,valPlaning, valFile, content){
    this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours";
    if (indice!=undefined || indice!=null){
      if (this.mode == TypeModeAffichageIndiceStat.MODE_POURCENTAGE){
        this.elementStatFicheDefault = indice.replace("#%", "").trim();
      }

      if (this.mode == TypeModeAffichageIndiceStat.MODE_TAUX){
        this.elementStatFicheDefault = indice.replace("#", "").trim();
      }

      if (valPlaning==null && valFile==null){
        this.initDonneevalid("calcul")
        this.departmentWithDataStat();
        this.communeWithDataStat();
      }else {
        this.initDonneevalid("planning", this.dataFinalesFOrStat)
        this.departmentWithDataStat(undefined, this.dataFinalesFOrStat);
        this.communeWithDataStat(undefined, this.dataFinalesFOrStat);
      }
    }
  }

  onPlanificationInSelect(etatPlannning){
    this.showSelect = etatPlannning;
    this.serviceNotification.configShowNotif.showLoading.text = "Chargement en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    if (etatPlannning=="achervee"){
      this.serviceProgrammation.getAllPlanningArchive().subscribe(
        (response) => {
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.openToast({titre : "Notification", message : "Le chargement des planifications archivées réussi", status : StatusNotification.SUCCESS})
          this.listPlanning = (<NewPlanification[]>response);
          this.selectPlanning = "Selection programmation achervée";
        },
        (error) => {
          this.serviceNotification.configShowNotif.showLoading.show = false;
          console.log(error);
          this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des planifications archivées", status : StatusNotification.ERROR});
        }
      );
    }
    if (etatPlannning=="encour"){

      this.serviceProgrammation.getAllplannifications().subscribe(
        (response)=>{
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.openToast({titre : "Notification", message : "Le chargement des planifications en cours réussi", status : StatusNotification.SUCCESS})
          this.listPlanning = (<NewPlanification[]>response);
          this.selectPlanning = "Selection programmation en cours";
        },
        (error)=>{
          console.log(error)
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des planifications en cours", status : StatusNotification.ERROR});
        }
      );
    }
  }


  chooseDataOfFile(idPlannigSelect){
    let tempFileCollecte : FicheCollecteM[] = [];
    this.dataFinalesFOrStatRestreintByPlanning = [];
    for(let itemFIle of this.listAllDataValid){
      if ((idPlannigSelect as number)==(itemFIle.programmation as number)){
        let ficheExist = tempFileCollecte.find(element => element.id==itemFIle.ficheCollecte.id);
        if (ficheExist == undefined){
          tempFileCollecte.push(itemFIle.ficheCollecte);
        }
        this.dataFinalesFOrStatRestreintByPlanning.push(itemFIle);
      }
    }
      this.listFileTrie = tempFileCollecte;
  }

  onAffichestat(idFile, content){
    let tempData : AnwserQuestions[] = [];
    for(let itemData of this.dataFinalesFOrStatRestreintByPlanning){
      if (idFile==itemData.ficheCollecte.id){
        tempData.push(itemData);
      }
    }
      this.legendeAffichageCarte = [];
      let dataFinalesFOrStat: AnwserQuestions[] = [];

      for (let data of tempData) {

        let databrut = JSON.parse((<string>data.reponseJson));
        let databrutJSON: String[] = Object.keys(databrut);
        let y = 0;
        let z = 0;
        for (let i = 0; i < databrutJSON.length; i++) {
          let separelabelData = Object.assign([], databrutJSON[i]);
          if (databrutJSON[i] == 'Region') {
            y++;
          }
          if (separelabelData[0] == '#') {
            if (this.mode == TypeModeAffichageIndiceStat.MODE_TAUX && separelabelData[1] != '%'){
              z++;
              let valeurretour = this.legendeAffichageCarte.find((element) => element == databrutJSON[i]);

              if (valeurretour == undefined) {
                this.legendeAffichageCarte.push(databrutJSON[i]);
              }
            }

            if (this.mode == TypeModeAffichageIndiceStat.MODE_POURCENTAGE && separelabelData[1] == '%'){
                z++;
                let valeurretour = this.legendeAffichageCarte.find((element) => element == databrutJSON[i]);

                if (valeurretour == undefined) {
                  this.legendeAffichageCarte.push(databrutJSON[i]);
                }
            }
          }
        }
        if (y > 0 && z > 0) {
          dataFinalesFOrStat.push(data);
        }
      }

    if (dataFinalesFOrStat.length==0){
      this.erreurEnregistrement = "Désolé cette fiche ne contient pas d'élément(s) statistique(s) ";
      this.erreurEnregistrementEN = "Désolé cette fiche ne contient pas d'élément(s) statistique(s) ";
      this.serviceNotification.openToast({titre : "Notification", message : this.erreurEnregistrement, status : StatusNotification.WARNING});
      if (this.zoneEleve=="Masquer Zone Elévée"){
        this.toggle_content.nativeElement.classList.remove("is-visible");
        this.zoneEleve = "Zones plus élévées";
      }
      this.dataFinalesFOrStat = [];
      this.dataNotFound = true;
      throw new Error("Aucun eelement statistique pour dans cette fiche.");
    }


      let valLocalStorageConfig : undefined | TypeInfoLegendeConfigAfficgeByFile[] = localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)!=null ? (localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)=="undefined" ? undefined : JSON.parse(localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)) ) : undefined;
      let ficheCurrentFormConfig : TypeInfoLegendeConfigAfficgeByFile = valLocalStorageConfig!=undefined ? valLocalStorageConfig.find(element=>element.idFile==idFile) : undefined;
        this.legendeAffichageCarteForConfig = this.legendeAffichageCarte;
      this.legendeAffichageCarte = [];
      if (valLocalStorageConfig==undefined || valLocalStorageConfig.length==0 || ficheCurrentFormConfig==undefined){
        this.legendeAffichageCarte = this.legendeAffichageCarteForConfig.slice(0, NBRE_ELEMENT_STAT);
      }else{
        if(this.mode==TypeModeAffichageIndiceStat.MODE_TAUX){
          this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModeTaux.length==0 ? ( this.legendeAffichageCarteForConfig.length>0 ? [...this.legendeAffichageCarteForConfig] : [] ) : ficheCurrentFormConfig.elementStatModeTaux;
          if (this.legendeAffichageCarte.length==0){
            this.serviceNotification.openToast({
              titre : 'Notification',
              message : "Attention, Aucun indicateur statistique taux de cette fiche n'a été trouvé dans votre configuration",
              status : StatusNotification.WARNING
            });
            if (this.zoneEleve=="Masquer Zone Elévée"){
              this.toggle_content.nativeElement.classList.remove("is-visible");
              this.zoneEleve = "Zones plus élévées";
            }
            this.isvisible = true;
            this.dataFinalesFOrStat = [];
            this.dataNotFound = true;
            throw new Error();
          }
        }else{
          this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModePourcentage.length==0 ? ( this.legendeAffichageCarteForConfig.length>0 ? [...this.legendeAffichageCarteForConfig] : [] ) : ficheCurrentFormConfig.elementStatModePourcentage;
          if (this.legendeAffichageCarte.length==0){
            this.serviceNotification.openToast({
              titre : 'Notification',
              message : "Attention, Aucun indicateur statistique pourcentage de cette fiche n'a été trouvé dans votre configuration",
              status : StatusNotification.WARNING
            });
            if (this.zoneEleve=="Masquer Zone Elévée"){
              this.toggle_content.nativeElement.classList.remove("is-visible");
              this.zoneEleve = "Zones plus élévées";
            }
            this.isvisible = true;
            this.dataFinalesFOrStat = [];
            this.dataNotFound = true;
            throw new Error();
          }
        }
      }


    this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours";
    this.elementStatFicheDefault = this.legendeAffichageCarte[0].replace("#", "").trim();
    this.currentfile = dataFinalesFOrStat[0].ficheCollecte.nomFiche;
    this.elementStatFicheDefaultFromSon = dataFinalesFOrStat[0].ficheCollecte.nomFiche;

    this.initDonneevalid("planning", dataFinalesFOrStat);
    this.departmentWithDataStat(undefined, dataFinalesFOrStat);
    this.communeWithDataStat(undefined, dataFinalesFOrStat);
    this.isvisible = false;
    if (content!=null && this.isConfigFiche=="actifConfigFiche"){
      this.openVerticallyCentered(content);
    }
  }


  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.alert.nativeElement.classList.add('hide');
  }

  closeAlertError() {
    this.alertError.nativeElement.classList.remove('show');
    this.alertError.nativeElement.classList.add('hide');
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openXl(content) {
    // @ts-ignore
    this.modalService.open(content, { size: 'xl' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }


  changeValueEvent(val : MatCheckboxChange){
    if(this.configForElementStat.length==0){
      if (val.checked){
        this.configForElementStat.push({
          idFile : (this.element_file.nativeElement.value as number),
          elementStatModeTaux : this.mode ==TypeModeAffichageIndiceStat.MODE_TAUX ? [val.source.value] : [],
          elementStatModePourcentage : this.mode !=TypeModeAffichageIndiceStat.MODE_TAUX ? [val.source.value] : []
        });
      }
    }else{
      if (val.checked){
        let idFileExiste = this.configForElementStat.find(element => element.idFile == (this.element_file.nativeElement.value as number));
        if (idFileExiste==undefined){
          this.configForElementStat.push({
            idFile : (this.element_file.nativeElement.value as number),
            elementStatModeTaux : this.mode ==TypeModeAffichageIndiceStat.MODE_TAUX ? [val.source.value] : [],
            elementStatModePourcentage : this.mode !=TypeModeAffichageIndiceStat.MODE_TAUX ? [val.source.value] : []
          });
        }else {
          let indexFicheInValConfig =  this.configForElementStat.findIndex((element)=> element.idFile==idFileExiste.idFile);
          if(this.mode==TypeModeAffichageIndiceStat.MODE_TAUX){
            this.configForElementStat[indexFicheInValConfig].elementStatModeTaux.push(val.source.value);
          }
          if(this.mode==TypeModeAffichageIndiceStat.MODE_POURCENTAGE){
            this.configForElementStat[indexFicheInValConfig].elementStatModePourcentage.push(val.source.value);
          }
        }
      }else{
        let idFileExiste = this.configForElementStat.find(element => element.idFile == (this.element_file.nativeElement.value as number));
        let indexFicheInValConfig =  this.configForElementStat.findIndex((element)=> element.idFile==idFileExiste.idFile);
        if (idFileExiste.elementStatModePourcentage.length==0 && idFileExiste.elementStatModeTaux.length==0){
          this.configForElementStat.splice(indexFicheInValConfig, 1);
        }else{
          if(this.mode==TypeModeAffichageIndiceStat.MODE_TAUX){
            let indexValueModeTaux =  this.configForElementStat[indexFicheInValConfig].elementStatModeTaux.findIndex((element)=> element==val.source.value);
            this.configForElementStat[indexFicheInValConfig].elementStatModeTaux.splice(indexValueModeTaux, 1);
          }

          if(this.mode==TypeModeAffichageIndiceStat.MODE_POURCENTAGE){
            let indexValueModePourrcentage =  this.configForElementStat[indexFicheInValConfig].elementStatModePourcentage.findIndex((element)=> element==val.source.value);
            this.configForElementStat[indexFicheInValConfig].elementStatModePourcentage.splice(indexValueModePourrcentage, 1);
          }
        }

        if (idFileExiste.elementStatModePourcentage.length==0 && idFileExiste.elementStatModeTaux.length==0){
          this.configForElementStat.splice(indexFicheInValConfig, 1);
        }
      }
    }
    if (this.configForElementStat.length==0){
      localStorage.setItem(`elementStatConfig_${localStorage.getItem("token")}`, undefined);
    }

    this.configForElementStatCloneForVisibilityApply = Object.assign([],this.configForElementStat, [] );

  }

  ApplicConfig(){
    localStorage.setItem(`elementStatConfig_${localStorage.getItem("token")}`, JSON.stringify(this.configForElementStat));
    this.onAffichestat(this.element_file.nativeElement.value, null);
    if (localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)!=null || localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)!="undefined"){
      this.serviceNotification.swalSuccess({
        icon: StatusNotification.SUCCESS,
        title: "l'application des configuration a ete éffectuée avec succes!!!",
        showConfirmButton: true,
        timer: 5000
      });
      this.configForElementStatCloneForVisibilityApply = [];
    }else{
      this.serviceNotification.swalError({
        icon: StatusNotification.ERROR,
        title: "Echec de l'Opération",
        text: "Echec de la prise en compte des configurations"
      });
    }
  }

  ApplicConfigForSiteWeb(content){
    this.isConfigIndicateurForSiteWeb = false;
    this.serviceElement.saveElementForSiteWeb(this.configForElementStatCloneForVisibilityApply).subscribe(
      (response)=>{
        let allElementFicheCollecteDefault = (response as ElementsFicheM[]);
        if (allElementFicheCollecteDefault.length==0){
          this.serviceNotification.swalInfo({
            html : "Cette fiche ne possède Aucun indicateur statistique ou n'est pas la fiche par défaut",
            title: 'Alert information',
            icon: StatusNotification.INFO,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Bien reçu!',
          });
        }
        if (allElementFicheCollecteDefault.length>0){
          this.elementStatForSiteWeb = (response[0] as ElementsFicheM[]);
          for(let itemElement of (response[0] as ElementsFicheM[])){
            if (itemElement.indicateurSiteWeb==true){
              this.isConfigIndicateurForSiteWeb = true;
            }
          }
          this.openVerticallyCentered(content);
        }
      },
      (error)=>{
        this.serviceNotification.openToast({
          titre : 'Notification',
          message : "Opération de sauvégarde des indicateurs pour le grand public échoué",
          status : StatusNotification.ERROR
        });
      }
    )
  }





  checkIdFunctionCurrentExistInConfig() : TypeInfoLegendeConfigAfficgeByFile{
    return  this.configForElementStat.find(element => element.idFile == (this.element_file.nativeElement.value as number));
  }

  checkIfElementSelection(valeurElementStat) : boolean{
     let elementStatInConfig =  this.checkIdFunctionCurrentExistInConfig();
     if (this.mode==TypeModeAffichageIndiceStat.MODE_TAUX){
      return  elementStatInConfig.elementStatModeTaux.find(element => element == valeurElementStat) != undefined;
     }else{
       return  elementStatInConfig.elementStatModePourcentage.find(element => element == valeurElementStat) != undefined;
     }
  }

  onChangeMode(valMode){

    this.mode = valMode;

    if (valMode == TypeModeAffichageIndiceStat.MODE_TAUX){
      this.serviceGeneral.MODE_AFFICHAGE = TypeModeAffichageIndiceStat.MODE_TAUX;
      this.serviceNotification.configShowNotif.showLoading.text = "Activation Mode taux";
    }else{
      this.serviceGeneral.MODE_AFFICHAGE = TypeModeAffichageIndiceStat.MODE_POURCENTAGE;
      this.serviceNotification.configShowNotif.showLoading.text = "Activation Mode %";
    }


    if (this.element_file.nativeElement.value==""){
      this.isvisible = true;
      this.initDonneevalid();
      this.departmentWithDataStat();
      this.communeWithDataStat();

    }else {
      this.onAffichestat(this.element_file.nativeElement.value, null);
    }

    this.isvisible = false;

  }
  onActiveConfigFFiche(valActiveConfigFiche){
    let tempModeActivation = this.isConfigFiche
    this.isConfigFiche = valActiveConfigFiche;
    if (tempModeActivation!=this.isConfigFiche){
      let message = valActiveConfigFiche=="DesactifConfigFiche"? "Désactivation réussie avec succés!!" : "Activation réussie avec succés!!";
      this.serviceNotification.openToast({
        titre : 'Notification',
        message : message,
        status : StatusNotification.SUCCESS
      });
    }else{
      this.serviceNotification.openToast({
        titre : 'Notification',
        message : "Echec de l'Activation",
        status : StatusNotification.ERROR
      });
    }
  }



}
