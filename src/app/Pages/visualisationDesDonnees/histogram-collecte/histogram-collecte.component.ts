import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnwserQuestions} from '../../../Model/anwserQuestions';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartType} from 'chart.js';
import {RegionM} from '../../../Model/RegionM';
import {AnwserQuestionsService} from '../../../Services/anwserQuestions/anwser-questions.service';
import {RegionService} from '../../../Services/Region/region.service';
import {NewPlanification} from '../../../Model/NewPlanification';
import {FicheCollecteM} from '../../../Model/FicheCollecteM';
import {NewPlannificationService} from '../../../Services/newPlannification/new-plannification.service';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
import {ModeProductionService, TypeModeAffichageIndiceStat} from '../../../PlatesFormes/mode-production.service';
import {NBRE_ELEMENT_STAT, TypeInfoLegendeConfigAfficgeByFile} from '../general-view/general-view.component';
// @ts-ignore
import * as $ from 'jquery';
// @ts-ignore
import defaultLanguage from '../../../../assets/i18n/fr.json';
// @ts-ignore
import LanguageEN from '../../../../assets/i18n/en.json';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-histogram-collecte',
  templateUrl: './histogram-collecte.component.html',
  styleUrls: ['./histogram-collecte.component.css']
})
export class HistogramCollecteComponent implements OnInit, OnDestroy {


  currentLangue = localStorage.getItem("langue");

  heading = 'Evaluation graphique des données collectées';
  subheading = 'visualiser les données collectées sur le terrain présenté ici sous différentes formes graphique';
  icon = 'pe-7s-bandaid icon-gradient bg-amy-crisp';


//DONNEES POUR LE CHART PIE
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartColors = [
    {
      backgroundColor: [],
    },
  ];
  tabColor = ['rgba(218,226,28,0.96)',
    'rgba(255,0,0,0.3)',
    'rgb(0,255,0)',
    'rgb(208,81,236)',
    'rgb(5,155,234)',
    'rgba(0,0,255,0.3)',
    'rgb(38,9,144)'];

  isvisible = false;
  dataNotFound = false;

  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];

  tilteDiagramPie = "Diagramme en pie de la collecte";
  tilteDiagramBaton = "Diagramme en baton de la collecte";

  currentfile = "";

  currentregion = "";

  regionCurrent: RegionM;

  legendeAffichageCarte = [];
  listDataForStat: AnwserQuestions[] = [];
  dataFinalesFOrStat: AnwserQuestions[] = [];
  listregions: RegionM[] = [];

  filterrDateEnd = undefined;
  filterrDateStart = undefined;

  dataFinalesFOrStatClone: AnwserQuestions[] = [];
  dataFinalesFOrStatRestreintByPlanning: AnwserQuestions[] = [];
  listPlanning : NewPlanification[] = [];
  listFileTrie : FicheCollecteM[] = [];
  selectPlanning = "Selection la planification...";

  listAllDataValid : AnwserQuestions[] = [];

  showSelect = "";

  @ViewChild('objPlanning') element_planning;
  @ViewChild('objfile') element_file;
  @ViewChild('libelleRegionFR') element_region;
  @ViewChild('alert') alert;
  @ViewChild('alertError') alertError;

  messageEnregistrement='Enregistrement effectué avec succès!';
  messageEnregistrementEN='Enregistrement effectué avec succès! (EN)';

  erreurEnregistrement='Erreur enregistrement! Vérifier doublons ou connexion au serveur';
  erreurEnregistrementEN='Erreur enregistrement! Vérifier doublons ou connexion au serveur (EN)';

  constructor(public serviceregion: RegionService,
              public servicedonnevalide: AnwserQuestionsService,
              public serviceProgrammation: NewPlannificationService,
              public serviceNotification : NotificationsGeneralService,
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


  }

  ngOnInit() {
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.chargeRegion();
    this.initDonneevalid();
    this.chargeAllDataValid();
  }

  ngOnDestroy(): void {}

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

  onChooseRegionForVisuel(infoRegion, valPlaning,valFile){
    this.serviceNotification.configShowNotif.showLoading.show = true;
      this.currentregion = infoRegion;
    if (valPlaning==null && valFile==null){
      this.initDonneevalid(infoRegion);
    }else{
      for(let itemData of this.dataFinalesFOrStatRestreintByPlanning){
        if (valFile==itemData.ficheCollecte.id){
          this.currentfile = itemData.ficheCollecte.nomFiche;
          break;
        }
      }
      this.initDonneevalid(infoRegion, this.dataFinalesFOrStat);
    }
    this.serviceNotification.configShowNotif.showLoading.show = false;
  }

  onSearchByDate(dateStart, dateEnd,valPlaning,valFile){
    this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours";
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.filterrDateStart =  new Date(dateStart).getTime();
    this.filterrDateEnd = new Date(dateEnd).getTime();
    if (valPlaning==null && valFile==null){
      this.initDonneevalid();
    }else{
      this.initDonneevalid(this.currentregion, this.dataFinalesFOrStat);
    }
    this.serviceNotification.configShowNotif.showLoading.show = false;
  }

  onViewGeneral(valPlaning, valFile){
// @ts-ignore
    $('#dateEnd').val("");
    // @ts-ignore
    $('#dateStart').val("");
   /* // @ts-ignore
    $('#fileconcerne').val(null);
    // @ts-ignore
    $('#planning').val(null);*/

    this.filterrDateEnd = undefined;
    this.filterrDateStart = undefined;

    if (valPlaning==null && valFile==null){
      this.initDonneevalid();
    }else{
      this.initDonneevalid(this.currentregion, this.dataFinalesFOrStat);
    }
  }



  showDataGraphPie(dataRegion:RegionM){
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.pieChartColors[0].backgroundColor = [];
    let i = 0;
    for (let itemregiondonnee of dataRegion.donnee){
      this.pieChartLabels.push(itemregiondonnee.label);
      this.pieChartData.push(itemregiondonnee.taux);
      this.pieChartColors[0].backgroundColor.push(this.tabColor[i]);
      i++;
    }

  }

  showDataGraphBaton(dataRegion:RegionM){
    this.barChartLabels = [];
    this.barChartData = [];
    let temp : number[] = [];

    for (let itemregiondonnee of dataRegion.donnee){
      this.barChartLabels.push(itemregiondonnee.label);
      temp.push(itemregiondonnee.taux);
    }
    this.barChartData.push({data:temp, label:"Vue baton"})
  }

  chargeRegion(){
    this.serviceregion.getRegions().subscribe(
      (reponse)=>{
        const tailleArray = (<RegionM[]>reponse).length;
        let regionInit: RegionM = new RegionM();
        for (let i=0; i<tailleArray;i++){
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
      (error)=>{
        console.log(error);
        this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des Régions, verifier votre connection au serveur", status : StatusNotification.ERROR});
      }
    )
  }


  initDonneevalid(nameRegion?: String,donneeValidFortrie?) {

    this.listDataForStat = [];
    this.serviceNotification.configShowNotif.showLoading.show = true;
    this.servicedonnevalide.getAllAnwserQuestionsofFileByDefault().subscribe(
      (reponse) => {

        this.listDataForStat = (<AnwserQuestions[]>reponse).length == 0 ? ( donneeValidFortrie == undefined ? [] : donneeValidFortrie ) : (<AnwserQuestions[]>reponse);

        if (this.listDataForStat.length > 0) {

          if (donneeValidFortrie==undefined) {

            this.legendeAffichageCarte = [];
            let tempDataFinal: AnwserQuestions[] = [];
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
                  if (this.serviceGeneral.MODE_AFFICHAGE == TypeModeAffichageIndiceStat.MODE_TAUX && separelabelData[1] != '%'){
                    z++;
                    let valeurretour = this.legendeAffichageCarte.find((element) => element == databrutJSON[i]);

                    if (valeurretour == undefined) {
                      this.legendeAffichageCarte.push(databrutJSON[i]);
                    }
                  }
                  if (this.serviceGeneral.MODE_AFFICHAGE  == TypeModeAffichageIndiceStat.MODE_POURCENTAGE && separelabelData[1] == '%'){
                    z++;
                    let valeurretour = this.legendeAffichageCarte.find((element) => element == databrutJSON[i]);
                    if (valeurretour == undefined) {
                      this.legendeAffichageCarte.push(databrutJSON[i]);
                    }
                  }
                }
              }
              if (y > 0 && z > 0) {
                tempDataFinal.push(data);
              }
            }
            this.dataFinalesFOrStat = [];
            this.dataFinalesFOrStat = tempDataFinal;
            this.dataFinalesFOrStatClone = Object.assign([],this.dataFinalesFOrStat,[]) ;
            this.currentfile = this.listDataForStat[0].ficheCollecte.nomFiche;

            if (this.legendeAffichageCarte.length>0 && this.dataFinalesFOrStat.length>0){
              let valLocalStorageConfig : undefined | TypeInfoLegendeConfigAfficgeByFile[] = localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)!=null ? (localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)=="undefined" ? undefined : JSON.parse(localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)) ) : undefined;
              let ficheCurrentFormConfig : TypeInfoLegendeConfigAfficgeByFile = valLocalStorageConfig!=undefined ? valLocalStorageConfig.find(element=>element.idFile==this.dataFinalesFOrStat[0].ficheCollecte.id) : undefined;
              let cloneLegendeForConfig =   Object.assign([], this.legendeAffichageCarte, []);
              if (valLocalStorageConfig==undefined || valLocalStorageConfig.length==0 || ficheCurrentFormConfig==undefined){
                this.legendeAffichageCarte = [];
                this.legendeAffichageCarte = cloneLegendeForConfig.slice(0, NBRE_ELEMENT_STAT);
              }else{
                if(this.serviceGeneral.MODE_AFFICHAGE==TypeModeAffichageIndiceStat.MODE_TAUX){
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

          if (donneeValidFortrie!=undefined){
            this.dataFinalesFOrStat = [];
            this.dataFinalesFOrStat = donneeValidFortrie;
          }

          let regionDefault: RegionM;
          if (nameRegion == undefined || nameRegion == '') {
            regionDefault = this.listregions.find(element => element.elementStatDefault != null);
            this.currentregion = regionDefault.libelleRegionFR;
          } else {
            regionDefault = this.listregions.find(element => element.libelleRegionFR == nameRegion);
            this.currentregion = regionDefault.libelleRegionFR;

          }


          let getData: AnwserQuestions[] = [];
          regionDefault.donnee = [];
          for (let itemdatafinal of this.dataFinalesFOrStat) {
            let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
            if (regionDefault.libelleRegionFR == itemdataJSON.Region) {
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

          if (getData.length >= 1) {
            for (let itemdatafinal of getData) {
              let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
              // @ts-ignore

              for (let y = 0; y < this.legendeAffichageCarte.length; y++) {
                if (regionDefault.donnee.length <= 0) {

                  regionDefault.donnee.push({
                    'label': this.legendeAffichageCarte[y],
                    // @ts-ignore
                    'taux': parseFloat(itemdataJSON[this.legendeAffichageCarte[y]])
                  });
                } else {
                  let cloneItemregion = [].concat(regionDefault.donnee).length;

                  let verifie = false;
                  let index = null;
                  for (let valToCompar = 0; valToCompar < cloneItemregion; valToCompar++) {
                    if (this.legendeAffichageCarte[y] == regionDefault.donnee[valToCompar].label) {
                      verifie = true;
                      index = valToCompar;
                    }
                  }
                  if (verifie == true) {
                    // @ts-ignore
                    regionDefault.donnee[index].taux += parseFloat(itemdataJSON[this.legendeAffichageCarte[y]]);
                  }
                  if (verifie == false) {
                    regionDefault.donnee.push({
                      'label': this.legendeAffichageCarte[y],
                      // @ts-ignore
                      'taux': parseFloat(itemdataJSON[this.legendeAffichageCarte[y]])
                    });

                  }
                }
              }
            }
          }

          if (this.serviceGeneral.MODE_AFFICHAGE == TypeModeAffichageIndiceStat.MODE_POURCENTAGE){
            for (let itemDataInRegion of regionDefault.donnee){
              itemDataInRegion.taux = itemDataInRegion.taux==0 ? itemDataInRegion.taux : ((itemDataInRegion.taux as number)/getData.length).toFixed(2);
            }
          }

          this.regionCurrent = regionDefault;
          if (regionDefault.donnee.length >= 1) {
            this.showDataGraphPie(regionDefault);
            this.showDataGraphBaton(regionDefault);
          } else {
            for (let y = 0; y < this.legendeAffichageCarte.length; y++) {
              if (regionDefault.donnee.length <= 0) {
                // @ts-ignore
                regionDefault.donnee.push({'label': this.legendeAffichageCarte[y], 'taux': 0});
              } else {
                let cloneItemDepartement2 = [].concat(regionDefault.donnee).length;
                let verifie2 = false;
                let index2 = null;
                for (let valToCompar = 0; valToCompar < cloneItemDepartement2; valToCompar++) {
                  if (this.legendeAffichageCarte[y] == this.regionCurrent.donnee[valToCompar].label) {
                    verifie2 = true;
                    index2 = valToCompar;
                  }
                }

                if (verifie2 == false) {
                  // @ts-ignore
                  regionDefault.donnee.push({'label': this.legendeAffichageCarte[y], 'taux': 0});
                }
              }
            }

            if (this.serviceGeneral.MODE_AFFICHAGE == TypeModeAffichageIndiceStat.MODE_POURCENTAGE){
              for (let itemDataInRegion of regionDefault.donnee){
                itemDataInRegion.taux = itemDataInRegion.taux==0 ? itemDataInRegion.taux : ((itemDataInRegion.taux as number)/getData.length).toFixed(2);
              }
            }
            this.showDataGraphPie(regionDefault);
            this.showDataGraphBaton(regionDefault);
          }
        }
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.dataNotFound = true;

      },
      (error) => {
        console.log(error);
        this.serviceNotification.configShowNotif.showLoading.show = false;
        this.dataNotFound = true;
      }
    );
  }


  onPlanificationInSelect(etatPlannning){
    this.showSelect = etatPlannning;
    this.listPlanning = [];
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
          this.serviceNotification.openToast({titre : "Notification", message : "Le chargement des planifications encour réussi", status : StatusNotification.SUCCESS})
          this.listPlanning = (<NewPlanification[]>response);
          this.selectPlanning = "Selection programmation encour";
        },
        (error)=>{
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.openToast({titre : "Notification", message : "Echec du chargement des planifications en cours", status : StatusNotification.ERROR});
        }
      );
    }
  }


  chooseDataOfFile(idPlannigSelect){
    let tempFileCollecte : FicheCollecteM[] = [];
    this.dataFinalesFOrStatRestreintByPlanning = [];
    this.listFileTrie = [];

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

  onAffichestat(idFile, valRegion){

    this.serviceNotification.configShowNotif.showLoading.show = true;
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
          if (this.serviceGeneral.MODE_AFFICHAGE == TypeModeAffichageIndiceStat.MODE_TAUX && separelabelData[1] != '%'){
            z++;
            let valeurretour = this.legendeAffichageCarte.find((element) => element == databrutJSON[i]);

            if (valeurretour == undefined) {
              this.legendeAffichageCarte.push(databrutJSON[i]);
            }
          }
          if (this.serviceGeneral.MODE_AFFICHAGE == TypeModeAffichageIndiceStat.MODE_POURCENTAGE && separelabelData[1] == '%'){
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
      this.serviceNotification.openToast({
        titre : "Notification",
        message : this.erreurEnregistrement,
        status : StatusNotification.WARNING});
      this.dataFinalesFOrStat = [];
      this.dataNotFound = true;
      this.serviceNotification.configShowNotif.showLoading.show = false;
      throw new Error("Aucun eelement statistique pour dans cette fiche.");
    }

    let valLocalStorageConfig : undefined | TypeInfoLegendeConfigAfficgeByFile[] = localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)!=null ? (localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)=="undefined" ? undefined : JSON.parse(localStorage.getItem(`elementStatConfig_${localStorage.getItem("token")}`)) ) : undefined;
    let ficheCurrentFormConfig : TypeInfoLegendeConfigAfficgeByFile = valLocalStorageConfig!=undefined ? valLocalStorageConfig.find(element=>element.idFile==idFile) : undefined;
    let  legendeAffichageCarteForConfig = Object.assign([], this.legendeAffichageCarte, []);
    this.legendeAffichageCarte = [];
    if (valLocalStorageConfig==undefined || valLocalStorageConfig.length==0 || ficheCurrentFormConfig==undefined){
      this.legendeAffichageCarte = legendeAffichageCarteForConfig.slice(0, NBRE_ELEMENT_STAT);
    }else{
      if(this.serviceGeneral.MODE_AFFICHAGE==TypeModeAffichageIndiceStat.MODE_TAUX){
        this.legendeAffichageCarte = ficheCurrentFormConfig.elementStatModeTaux;
        if (this.legendeAffichageCarte.length==0){
          this.serviceNotification.openToast({
            titre : 'Notification',
            message : "Attention, Aucun indicateur statistique taux de cette fiche n'a été trouvé dans votre configuration",
            status : StatusNotification.WARNING
          });
          this.serviceNotification.configShowNotif.showLoading.show = false;
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
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.isvisible = true;
          this.dataFinalesFOrStat = [];
          this.dataNotFound = true;
          throw new Error();
        }
      }
    }


    this.serviceNotification.configShowNotif.showLoading.text = "Calcul en cours";
    this.currentfile = dataFinalesFOrStat[0].ficheCollecte.nomFiche;

    if (valRegion=='' || valRegion==null){
      this.initDonneevalid(this.currentregion, dataFinalesFOrStat);
    }else{
      this.initDonneevalid(undefined, dataFinalesFOrStat);
    }
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

