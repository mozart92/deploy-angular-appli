import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RegionM} from '../../../Model/RegionM';
import {AnwserQuestions} from '../../../Model/anwserQuestions';
import {AnwserQuestionsService} from '../../../Services/anwserQuestions/anwser-questions.service';
import {Label} from 'ng2-charts';
import {ChartDataSets} from 'chart.js';
import {RegionService} from '../../../Services/Region/region.service';
import {NewPlanification} from '../../../Model/NewPlanification';
import {FicheCollecteM} from '../../../Model/FicheCollecteM';
import {NewPlannificationService} from '../../../Services/newPlannification/new-plannification.service';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import {ModeProductionService, TypeModeAffichageIndiceStat} from '../../../PlatesFormes/mode-production.service';
import {NBRE_ELEMENT_STAT, TypeInfoLegendeConfigAfficgeByFile} from '../general-view/general-view.component';
import {DepartementM} from '../../../Model/departementM';
// @ts-ignore
import * as $ from 'jquery';

// @ts-ignore
import defaultLanguage from "../../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../../assets/i18n/en.json";
import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'app-diagram-comparatif',
  templateUrl: './diagram-comparatif.component.html',
  styleUrls: ['./diagram-comparatif.component.css']
})
export class DiagramComparatifComponent implements OnInit, OnDestroy {

  currentLangue = localStorage.getItem("langue");

  heading = 'Graphe comparatif des données collectées dans les régions';
  subheading = "Visualiser ces données et sur trois niveaux selon la région";
  icon = 'pe-7s-bandaid icon-gradient bg-amy-crisp';


  legendeAffichageCarte = [];
  listDataForStat: AnwserQuestions[] = [];
  dataFinalesFOrStat: AnwserQuestions[] = [];
  listregions: RegionM[] = [];
  listDepartements: DepartementM[] = [];

  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];

  dataNotFound = false;
  isvisible = false;

  titleDiagram = "Diagramme comparatif de toutes les région du Cameroun de la collecte";
  currentfile = "";

  filterrDateEnd = undefined;
  filterrDateStart = undefined;


  xAxis: {
    categories: any[]
  };

  series: Array<{
    name: string,
    type: any,
    data: Array<number>
  }>;

  title: {
    text:string
  };

  @ViewChild("objview") toggle_content;
  @ViewChild("objDateStart") objDateStart;
  @ViewChild("objDateEnd") objDateEnd;
  @ViewChild("objPlanning") element_planning : HTMLSelectElement;
  @ViewChild("objfile") element_file : HTMLSelectElement;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;


  @ViewChild('departement') departementID : ElementRef;

  showSelect = "";
  dataFinalesFOrStatClone: AnwserQuestions[] = [];
  dataFinalesFOrStatRestreintByPlanning: AnwserQuestions[] = [];
  listPlanning : NewPlanification[] = [];
  listFileTrie : FicheCollecteM[] = [];
  selectPlanning = "Selection la plannification...";
  listAllDataValid : AnwserQuestions[] = [];

  messageEnregistrement='Enregistrement effectué avec succès!';
  messageEnregistrementEN='Enregistrement effectué avec succès! (EN)';

  erreurEnregistrement='Erreur enregistrement! Vérifier doublons ou connexion au serveur';
  erreurEnregistrementEN='Erreur enregistrement! Vérifier doublons ou connexion au serveur (EN)';

  mode;

  @Input() idPlanningInput;
  @Input() idFicheInput;
  @Input() ModeInput;
  @Input() NameDiagrammeInput;


  formarGraphMobil = {
    'category': [{label : ''}],
    'dataset': {},
    'key': [],
    'nomFiche': '',
    'description': '',
    'Departement': []
  }


  constructor(public serviceregion: RegionService,
              public servicedonnevalide: AnwserQuestionsService,
              public serviceProgrammation: NewPlannificationService,
              public serviceNotification : NotificationsGeneralService,
              public servicesGeneral : ModeProductionService,
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
    this.chargeRegion();
    if (this.idFicheInput!=undefined && this.idPlanningInput!=undefined){
      this.titleDiagram =  this.NameDiagrammeInput;
      this.mode = this.ModeInput;
      this.dataFinalesFOrStatRestreintByPlanning = this.idPlanningInput;
      this.onAffichestat(this.idFicheInput);
    }else{
      this.mode = this.servicesGeneral.MODE_AFFICHAGE;
      this.initDonneevalid();
      //this.initDonneevalidMobil();
      this.chargeAllDataValid();
    }
  }

  chargeAllDataValid(){
    this.servicedonnevalide.getAnwserQuestion().subscribe(
      (response)=>{
        this.listAllDataValid = ( response as AnwserQuestions[]);
      },
      (error)=>{
        console.log(error);
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des données validées, vérifier votre connection au serveur", status : StatusNotification.ERROR});;

      }
    )
  }

  ngOnDestroy(): void {}

  chargeRegion() {

    this.serviceregion.getRegions().subscribe(
      (reponse) => {
        const tailleArray = (<RegionM[]>reponse).length;
        let regionInit: RegionM = new RegionM();
        this.listregions = [];
        for (let i = 0; i < tailleArray; i++) {
          regionInit = new RegionM(
            reponse[i].id,
            reponse[i].codeRegion,
            reponse[i].libelleRegionFR,
            reponse[i].libelleRegionEN,
            [],
            reponse[i].elementStatDefault
          );

          this.listregions.push(regionInit);

        }
      },
      (error) => {
        console.log(error);
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des Régions, verifier votre connection au serveur", status : StatusNotification.ERROR});

      }
    )
  }

  onSearchByDate(dateStart, dateEnd){
    if(this.ModeInput==undefined){
      this.mode = this.servicesGeneral.MODE_AFFICHAGE;
    }




    this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.filterrDateStart =  new Date(dateStart).getTime();
    this.filterrDateEnd = new Date(dateEnd).getTime();
    if (this.element_file.value==null && this.element_planning.value==null){
      this.initDonneevalid();
    }else{
      //this.currentfile = this.listFileTrie.find(element => element.id==this.element_planning.value).nomFiche;
      this.initDonneevalid(this.dataFinalesFOrStat);
    }
    this.serviceNotification.configShowNotif.showLoading.show = false;

  }

  onViewGeneral(){
    if(this.ModeInput==undefined){
      this.mode = this.servicesGeneral.MODE_AFFICHAGE;
    }
    this.filterrDateEnd = undefined;
    this.filterrDateStart = undefined;
// @ts-ignore
    $('#dateEnd').val("");
    // @ts-ignore
    $('#dateStart').val("");
    // @ts-ignore
   /* $('#fileconcerne').val(null);
    // @ts-ignore
    $('#planning').val(null);*/

    if ((this.element_planning.value=="" || this.element_planning.value==null) && (this.element_file.value=="" || this.element_file.value==null)){
      this.initDonneevalid();
    }else{
      //this.currentfile = this.listFileTrie.find(element => element.id==this.element_file.value).nomFiche;
      this.initDonneevalid(this.dataFinalesFOrStat);
    }
  }


  initDonneevalid(donneeValidFortrie?: AnwserQuestions[]) {
    this.servicedonnevalide.getAllAnwserQuestionsofFileByDefault().subscribe(
      (reponse) => {

        this.listDataForStat = (<AnwserQuestions[]>reponse).length == 0 ? ( donneeValidFortrie == undefined ? [] : donneeValidFortrie ) : (<AnwserQuestions[]>reponse);

        if (this.listDataForStat.length > 0) {

          if (donneeValidFortrie==undefined) {
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
              let valLocalStorageConfig : undefined | TypeInfoLegendeConfigAfficgeByFile[] = localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)!=null ? (localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)=="undefined" ? undefined : JSON.parse(localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)) ) : undefined;
              let ficheCurrentFormConfig : TypeInfoLegendeConfigAfficgeByFile = valLocalStorageConfig!=undefined ? valLocalStorageConfig.find(element=>element.idFile==this.dataFinalesFOrStat[0].ficheCollecte.id) : undefined;
              let cloneLegendeForConfig =   Object.assign([], this.legendeAffichageCarte, []);
              if (valLocalStorageConfig==undefined || valLocalStorageConfig.length==0 || ficheCurrentFormConfig==undefined){
                this.legendeAffichageCarte = [];
                this.legendeAffichageCarte = cloneLegendeForConfig.slice(0, NBRE_ELEMENT_STAT);
              }else{
                if(this.mode==TypeModeAffichageIndiceStat.MODE_TAUX){
                  this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModeTaux;
                  if (this.legendeAffichageCarte.length==0){
                    this.serviceNotification.openToast({
                      titre : 'Notification',
                      message : "Désolé, aucune donnée indice taux n'a été trouvé dans la configuration de cette fiche par défaut",
                      status : StatusNotification.WARNING
                    });
                    this.isvisible = true;
                  }
                }else{
                  this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModePourcentage;
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

          if (donneeValidFortrie!=undefined){
            this.dataFinalesFOrStat = [];
            this.dataFinalesFOrStat = donneeValidFortrie;
          }


          this.barChartLabels  = [];

          for (let itemregion of this.listregions) {
            itemregion.donnee = [];
            let taux: number = 0;
            let getData: AnwserQuestions[] = [];
            for (let itemdatafinal of this.dataFinalesFOrStat) {
              let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
              if (itemregion.libelleRegionFR == itemdataJSON.Region) {
                if (this.filterrDateStart!=undefined && this.filterrDateEnd!=undefined){
                  let dateFilterData = new Date (itemdatafinal.create_le.toString().split("T")[0]).getTime();
                  if (this.filterrDateStart<=dateFilterData && dateFilterData<=this.filterrDateEnd) {
                    getData.push(itemdatafinal);
                  }
                }else{
                  getData.push(itemdatafinal);
                }
              }
            }

            if (getData.length >= 1) {
              for (let itemdatafinal of getData) {
                let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
                // @ts-ignore

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
            this.barChartLabels.push(itemregion.libelleRegionFR);

          }

          let temp: number[] = []
          let hello: any[] = []
          //let getDataGlobal: AnwserQuestions[] = [];
          for (let itemregiondonnee of this.listregions[0].donnee) {
            for (let itemRegion of this.listregions) {
              let getDataGlobal: AnwserQuestions[] = [];
              for (let itemdatafinal of this.dataFinalesFOrStat) {
                let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
                if (itemRegion.libelleRegionFR == itemdataJSON.Region) {
                  if (this.filterrDateStart!=undefined && this.filterrDateEnd!=undefined){
                    let dateFilterData = new Date (itemdatafinal.create_le.toString().split("T")[0]).getTime();
                    if (this.filterrDateStart<=dateFilterData && dateFilterData<=this.filterrDateEnd) {
                      getDataGlobal.push(itemdatafinal);
                    }
                  }else{
                    getDataGlobal.push(itemdatafinal);
                  }
                }
              }

              for (let itemdonnee of itemRegion.donnee) {
                if (itemdonnee.label == itemregiondonnee.label) {
                  if (this.mode == TypeModeAffichageIndiceStat.MODE_POURCENTAGE){
                    itemdonnee.taux = itemdonnee.taux==0 ? itemdonnee.taux : ((itemdonnee.taux as number)/getDataGlobal.length).toFixed(2);
                    temp.push(itemdonnee.taux);
                  }else{
                    temp.push(itemdonnee.taux);
                  }
                }
              }
            }
            hello.push({data: temp, label: itemregiondonnee.label});
            temp = [];
          }

          this.barChartData = [];
          this.barChartData = hello;
        }
        this.dataNotFound  = true;
      },
      (error) => {
        console.log(error);
        this.dataNotFound  = true;
      }
    );
  }



  initDonneevalidMobil() {
    this.servicedonnevalide.getAllAnwserQuestionsofFileByDefault().subscribe(
      (reponse) => {

        this.listDataForStat = (<AnwserQuestions[]>reponse);

        if ((<AnwserQuestions[]>reponse).length>0) {

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
                  if (this.legendeAffichageCarte.length==0){
                    this.serviceNotification.openToast({
                      titre : 'Notification',
                      message : "Désolé, aucune donnée indice taux n'a été trouvé dans la configuration de cette fiche par défaut",
                      status : StatusNotification.WARNING
                    });
                    this.isvisible = true;
                  }
                }else{
                  this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModePourcentage;
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
          }

          this.title =  {text: this.listDataForStat[0].ficheCollecte.nomFiche};

          let label: String[] = [];
          let getDataGlobal: AnwserQuestions[] = [];
          for (let itemregion of this.listregions) {
            let taux: number = 0;
            let getData: AnwserQuestions[] = [];
            for (let itemdatafinal of this.dataFinalesFOrStat) {
              let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
              if (itemregion.libelleRegionFR == itemdataJSON.Region) {
                getData.push(itemdatafinal);
              }
            }
            getDataGlobal = getData;
            if (getData.length >= 1) {
              for (let itemdatafinal of getData) {
                let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
                // @ts-ignore

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
            label.push(itemregion.libelleRegionFR);
          }

          this.xAxis = {categories : label};

          let temp: number[] = []
          let hello: any[] = []
          for (let itemregiondonnee of this.listregions[0].donnee) {
            for (let itemRegion of this.listregions) {
              for (let itemdonnee of itemRegion.donnee) {
                if (itemdonnee.label == itemregiondonnee.label) {
                  if (this.mode == TypeModeAffichageIndiceStat.MODE_POURCENTAGE){
                    itemdonnee.taux = itemdonnee.taux==0 ? itemdonnee.taux : ((itemdonnee.taux as number)/getDataGlobal.length).toFixed(2);
                    temp.push(itemdonnee.taux);
                  }else{
                    temp.push(itemdonnee.taux);
                  }
                }
              }
            }
            hello.push({data: temp, type:undefined, name: itemregiondonnee.label});
            temp = [];
          }
          this.series = hello;
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }

  onPlanificationInSelect(etatPlannning){
    this.showSelect = etatPlannning;
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

  onAffichestat(idFile){

    if(this.ModeInput==undefined){
      this.mode = this.servicesGeneral.MODE_AFFICHAGE;
    }

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
          if (this.mode== TypeModeAffichageIndiceStat.MODE_TAUX && separelabelData[1] != '%'){
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
      this.dataFinalesFOrStat = [];
      this.dataNotFound = true;
      throw new Error("Aucun eelement statistique pour dans cette fiche.");
    }

    let valLocalStorageConfig : undefined | TypeInfoLegendeConfigAfficgeByFile[] = localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)!=null ? (localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)=="undefined" ? undefined : JSON.parse(localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)) ) : undefined;
    let ficheCurrentFormConfig : TypeInfoLegendeConfigAfficgeByFile = valLocalStorageConfig!=undefined ? valLocalStorageConfig.find(element=>element.idFile==idFile) : undefined;
    let legendeAffichageCarteForConfig = Object.assign([],this.legendeAffichageCarte, []);
    this.legendeAffichageCarte = [];
    if (valLocalStorageConfig==undefined || valLocalStorageConfig.length==0 || ficheCurrentFormConfig==undefined){
      this.legendeAffichageCarte = legendeAffichageCarteForConfig.slice(0, NBRE_ELEMENT_STAT);
    }else{
      if(this.mode==TypeModeAffichageIndiceStat.MODE_TAUX){
        this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModeTaux;
        if (this.legendeAffichageCarte.length==0){
          this.serviceNotification.openToast({
            titre : 'Notification',
            message : "Attention, Aucun indicateur statistique taux de cette fiche n'a été trouvé dans votre configuration",
            status : StatusNotification.WARNING
          });

          this.isvisible = true;
          this.dataFinalesFOrStat = [];
          this.dataNotFound = true;
          throw new Error();
        }
      }else{
        this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModePourcentage;
        if (this.legendeAffichageCarte.length==0){
          this.serviceNotification.openToast({
            titre : 'Notification',
            message : "Attention, Aucun indicateur statistique pourcentage de cette fiche n'a été trouvé dans votre configuration",
            status : StatusNotification.WARNING
          });
          this.isvisible = true;
          this.dataFinalesFOrStat = [];
          this.dataNotFound = true;
          throw new Error();
        }
      }
    }
    this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours";
    this.currentfile = dataFinalesFOrStat[0].ficheCollecte.nomFiche;
    this.initDonneevalid(dataFinalesFOrStat);
    this.serviceNotification.configShowNotif.showLoading.show = false;
  }


  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.alert.nativeElement.classList.add('hide');
  }

  closeAlertError() {
    this.alertError.nativeElement.classList.remove('show');
    this.alertError.nativeElement.classList.add('hide');
  }



}









