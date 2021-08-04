import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseQuestionnaireM} from '../../Model/BaseQuestionnaireM';
import {AnwserQuestions} from '../../Model/anwserQuestions';
import {FicheCollecteM} from '../../Model/FicheCollecteM';
import {NewPlanification} from '../../Model/NewPlanification';
import {ExporterService} from '../../Services/exports/exporter.service';
import {FicheCollecteServicee} from '../../Services/ficheCollecte.service';
import {AnwserQuestionsService} from '../../Services/anwserQuestions/anwser-questions.service';
import {NewPlannificationService} from '../../Services/newPlannification/new-plannification.service';

// @ts-ignore
import defaultLanguage from "../../../assets/i18n/fr.json";
// @ts-ignore
import LanguageEN from "../../../assets/i18n/en.json";
import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'app-export-datas-encour',
  templateUrl: './export-datas-encour.component.html',
  styleUrls: ['./export-datas-encour.component.sass']
})
export class ExportDatasEncourComponent implements OnInit, OnDestroy {


  currentRegion = localStorage.getItem('region')=="null" || localStorage.getItem('region')=="undefined" ? null : localStorage.getItem('region');
  currentDepartement = localStorage.getItem('departement')=="null" || localStorage.getItem('departement')=="undefined" ? null : localStorage.getItem('departement');
  currentCommune = localStorage.getItem('commune')=="null" || localStorage.getItem('commune')=="undefined" ? null : localStorage.getItem('commune');
  currentCZV = localStorage.getItem('czvUser')=="null" || localStorage.getItem('czvUser')=="undefined" ? null : localStorage.getItem('czvUser');


  heading = 'Exportation des données des planifications en cours';
  subheading = 'Exporter vos donnees collectées pour les planifications en cours';
  icon = 'pe-7s-bandaid icon-gradient bg-amy-crisp';



  listBDquestionnaire: BaseQuestionnaireM[] = [];
  listDataValid: AnwserQuestions[] = [];
  listFile: FicheCollecteM[] = [];
  listFileTrie: FicheCollecteM[] =  [];
  listPlanning: NewPlanification[] =  [];
  enteteTab: Array<any> = [];
  bodyTab: Array<any> = [];

  title = 'angulardatatables';
  dtOptions: any = {};
  currentfile: string = "";
  currentPlanningChoose: NewPlanification;
  countItemAffcihe: number = 0;
  page = 1;
  LIMIT_PARGINATION = 10;
  listForPaginaition: string[] = [];

  isvisible = false;


  constructor(public serviceDataValid: AnwserQuestionsService,
              public serviceFile: FicheCollecteServicee,
              private serviceexportData: ExporterService,
              private serviceProgrammation: NewPlannificationService,
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
    this.isvisible = true;
    this.loadPlanning();
    this.loadBDFile();
    this.loadDataValid();
    this.isvisible = false;


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ]
    };
  }

  ngOnDestroy(): void {
  }

  exportAsXLSX(val){

    const dataForExport = val=='tout' ? this.listForPaginaition : val== 'unique' ? this.bodyTab : [];

    let dataexport : any[] = [];
    for (let datafilter of dataForExport){
      let jsonformat = {};
      let i = 0;
      for(let itemtete of this.enteteTab){
        jsonformat[itemtete] = datafilter[i];
        i++;
      }
      dataexport.push(jsonformat);
    }
    this.serviceexportData.exportToExcel(dataexport, this.currentfile);
  }

  loadDataValid(){
    this.serviceDataValid.getAnwserQuestion().subscribe(
        (response)=>{
          this.listDataValid = (<AnwserQuestions[]>response);
        },
        (error)=>{
          console.log(error)
        }
    );
  }


  loadBDFile(){
    this.serviceFile.getFicheCollectes().subscribe(
        (response)=>{
          this.listFile = (<FicheCollecteM[]>response);
        },
        (error)=>{
          console.log(error)
        }
    );
  }

  loadPlanning(){
    this.serviceProgrammation.getAllplannifications().subscribe(
        (response)=>{
          this.listPlanning = (<NewPlanification[]>response);
        },
        (error)=>{
          console.log(error)
        }
    );
  }


  onAfficheTable(idfile) {

    this.bodyTab = [];
    this.enteteTab = [];
    let itemfileForhead: AnwserQuestions = this.listDataValid.find(element => element.ficheCollecte.id == idfile && (element.programmation as number)==this.currentPlanningChoose.id);

    if (itemfileForhead != undefined) {
      let listdataclone: AnwserQuestions[] = Object.assign([], this.listDataValid, []);
      let tempfilebody: Array<any> = [];
      let tempfileEntete: Array<AnwserQuestions> = [];

      for (let dataconcerne of listdataclone) {
        if (dataconcerne.ficheCollecte.id == idfile) {
          if (this.currentPlanningChoose.id == (dataconcerne.programmation as number)) {

            let databrut = JSON.parse((<string>dataconcerne.reponseJson));

            if (this.currentRegion == null) {
              tempfileEntete.push(dataconcerne);
            }else{
              if (this.currentCZV != null &&  databrut['CZV'] == this.currentCZV) {
                tempfileEntete.push(dataconcerne);
              }

              if (this.currentCommune != null &&  databrut['Commune'] == this.currentCommune && this.currentCZV == null) {
                tempfileEntete.push(dataconcerne);
              }

              if (this.currentDepartement != null &&  databrut['Departement'] == this.currentDepartement && this.currentCommune == null) {
                tempfileEntete.push(dataconcerne);
              }

              if (databrut['Region'] == this.currentRegion && this.currentDepartement == null) {
                tempfileEntete.push(dataconcerne);
              }
            }
          }
        }

      }

      this.listForPaginaition = [];
      if (tempfileEntete.length>0){
        this.currentfile = tempfileEntete[0].ficheCollecte.nomFiche;
        this.enteteTab = Object.keys(JSON.parse(tempfileEntete[0].reponseJson.toString()));
        let backupFistEntente = Object.keys(JSON.parse(tempfileEntete[0].reponseJson.toString()));
        this.enteteTab.push("envoyer le");
        this.enteteTab.push("envoyer par");

        //for (let dataconcerne of listdataclone){
        for (let dataconcerne of tempfileEntete){
          if (dataconcerne.ficheCollecte.id==idfile){

            if (this.currentPlanningChoose.id == (dataconcerne.programmation as number)){
              let tempDataAffiche = JSON.parse(dataconcerne.reponseJson.toString());
              let dataDecodeJSONBody: any[] = [];

              for (let itemEnteteData of backupFistEntente ){
                dataDecodeJSONBody.push(tempDataAffiche[itemEnteteData]);
              }

              dataDecodeJSONBody.push(new Date(dataconcerne.create_le).toDateString());
              dataDecodeJSONBody.push(dataconcerne.utilisateursCreate.nomPrenom);
              tempfilebody.push(dataDecodeJSONBody);
            }
          }
        }
      }
      this.listForPaginaition = tempfilebody;
      this.countItemAffcihe = this.listForPaginaition.length;
      this.bodyTab = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      console.log('DESOLE IL YA PAS DE DONNEE EXISTENT CORRESPONDANT A CE FICHIER SELECTIONNEE');
    }
  }



  chooseFile(idbdquestionnaire){
    this.listFileTrie = null;
    let listfileclone:  FicheCollecteM[] = Object.assign([], this.listFile, []);
    let tempFchier: FicheCollecteM[] = [];
    for (let itemfilelogic of listfileclone){
      if (itemfilelogic.baseQuestionnaire.id==idbdquestionnaire){
        tempFchier.push(itemfilelogic);
      }
    }
    this.listFileTrie = tempFchier;
  }

  chooseBDquestionnaire(idPlanning){
    let planning: NewPlanification = this.listPlanning.find(element=>element.id==idPlanning);
    this.currentPlanningChoose = planning;
    this.listBDquestionnaire = planning.baseQuestionnaires;
  }


  onChangePageRecup(dataRecup) {
    this.bodyTab = [];
    this.page = dataRecup;
    if (dataRecup == 1) {
      this.bodyTab = this.listForPaginaition.slice(0, this.LIMIT_PARGINATION);
    } else {
      this.bodyTab = this.listForPaginaition.slice(((dataRecup - 1) * this.LIMIT_PARGINATION), (this.LIMIT_PARGINATION * dataRecup));
    }
  }

  onChangeNbreDatasAffiche(valNbre){
    this.LIMIT_PARGINATION = valNbre;
    this.page = 1;
    this.bodyTab = this.listForPaginaition.slice(0, valNbre);
  }


}
