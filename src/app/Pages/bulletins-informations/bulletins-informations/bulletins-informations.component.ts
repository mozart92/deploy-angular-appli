import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewPlanification} from '../../../Model/NewPlanification';
import {BaseQuestionnaireM} from '../../../Model/BaseQuestionnaireM';
import {AnwserQuestions} from '../../../Model/anwserQuestions';
import {RegionM} from '../../../Model/RegionM';
import {NiveauValidationM} from '../../../Model/NiveauValidationM';
import {BaseQuestionnaireService} from '../../../Services/baseQuestionnaire.service';
import {NewPlannificationService} from '../../../Services/newPlannification/new-plannification.service';
import {AnwserQuestionsService} from '../../../Services/anwserQuestions/anwser-questions.service';
import {RegionService} from '../../../Services/Region/region.service';
import {FicheCollecteM} from '../../../Model/FicheCollecteM';
import {FicheCollecteServicee} from '../../../Services/ficheCollecte.service';
import {faTh} from '@fortawesome/free-solid-svg-icons';
import {Label} from 'ng2-charts';
import {ChartDataSets} from 'chart.js';
import {NotificationsGeneralService} from '../../../ComposantsPerso/ServiceNotif/notifications-general.service';
import {jsPDF} from 'jspdf';
//import * as jspdf from 'jspdf';
import  html2canvas from 'html2canvas';
import {TypeModeAffichageIndiceStat} from '../../../PlatesFormes/mode-production.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {StatusNotification} from '../../../ComposantsPerso/notifications-operation/notifications-operation.component';
// @ts-ignore
import * as $ from 'jquery';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface TypeBaseNotificationForBulletin {
  baseNotification: BaseQuestionnaireM;
  ficheForCollecte: FicheCollecteM;
  nbreDataCollectee: number;
  iDplanification: number;
  donneeValideBrut: Array<AnwserQuestions>;
  dataHeard: Array<string>;
  donneeDetail;
  nbreIndicateurTaux: number;
  nbreIndicateurPourcentage: number;
}


@Component({
  selector: 'app-bulletins-informations',
  templateUrl: './bulletins-informations.component.html',
  styleUrls: ['./bulletins-informations.component.sass'],
  styles: [`
    .no-gutters {
      margin-left: 23px !important;
    }
  `]
})
export class BulletinsInformationsComponent implements OnInit {

  heading = 'Affichage du bulletin d\'information';
  subheading = 'Pour la semaine du lundi 02-11-2020 au Dimanche 08-11-2020 ';
  icon = 'pe-7s-file icon-gradient bg-premium-dark';
  faTh = faTh;

  listPlannification: NewPlanification[] = [];
  onPlanningForRead: NewPlanification;
  dataPlanningArchiveForBull: NewPlanification;

  libelleBouton = 'Commencer';

  reseiveData = null;
  @ViewChild('objBD') objBD;
  @ViewChild('objTitle') objTitle;
  dataToSend = null;
  isvisible: boolean = false;
  show = false;
  done = false;
  thrust = true;
  userrCurrent = localStorage.getItem('token');

  listBasequestionnaire: BaseQuestionnaireM[] = [];
  listAllDataValide: AnwserQuestions[] = [];
  dataFinalesFOrStat: AnwserQuestions[] = [];
  listregions: RegionM[] = [];
  listGroupByPlanning: NiveauValidationM[] = [];

  dataSource: any = {'chart': {}, 'colorrange': {}, 'data': []};

  dataAsByFusioncharts: Array<any> = [];

  chart = {
    'caption': 'Vue global sur tout le térritoire nationnal:',
    'numbersuffix': '',
    'includevalueinlabels': '1',
    'labelsepchar': ': ',
    'entityFillHoverColor': '#FFF9C4',
    'theme': 'fusion'
  };

  colorrange = {
    'minvalue': '0',
    'code': '#d92550',
    'color': []
  };

  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];

  listFile: FicheCollecteM[] = [];
  idPlanningCourent;

  listFicheCollecteNbreData: TypeBaseNotificationForBulletin[] = [];

  calendrierJourFrancais = {
    1: 'Janvier',
    2: 'Février',
    3: 'Mars',
    4: 'Avril',
    5: 'Mai',
    6: 'Juin',
    7: 'Juillet',
    8: 'Août',
    9: 'Septembre',
    10: 'Octobre',
    11: 'Novembre',
    12: 'Décembre',
  };

  @ViewChild('content') content: ElementRef;

  commentaireDefault;
  isVisibleCommentaire = false;

  constructor(private router: ActivatedRoute,
              private serBDQuestionnaire: BaseQuestionnaireService,
              private servicePlanning: NewPlannificationService,
              private serviceDataValide: AnwserQuestionsService,
              private serviceregion: RegionService,
              public serviceFile: FicheCollecteServicee,
              private serviceNotification: NotificationsGeneralService) {
  }

  ngOnInit(): void {

    this.router.params.subscribe(
      (params) => {
        console.log(params, params.idPlanning);
        this.idPlanningCourent = params.idPlanning;
        this.servicePlanning.getPlanningArchiverByIdPlanning(params.idPlanning).subscribe(
          (data) => {
            let formatPLanningTemp = (data as NewPlanification);
            let formaPlanning = new NewPlanification(
              formatPLanningTemp.id,
              formatPLanningTemp.libellePlanning,
              formatPLanningTemp.dateDebut,
              formatPLanningTemp.dateFin,
              formatPLanningTemp.frequence,
              formatPLanningTemp.dateEffictif,
              formatPLanningTemp.typeCloture,
              formatPLanningTemp.observations,
              null,
              formatPLanningTemp.baseQuestionnaires,
              formatPLanningTemp.objectif,
              formatPLanningTemp.programmerPar,
              formatPLanningTemp.dateFinInitiale,
              formatPLanningTemp.idOrigin,
              formatPLanningTemp.libellePlanningEN,
              formatPLanningTemp.observationsEN,
              formatPLanningTemp.objectifEN,
              formatPLanningTemp.commentaireBulletin,

            );

            this.dataPlanningArchiveForBull = formaPlanning;
            //this.commentaireDefault = 'planification : ' + this.dataPlanningArchiveForBull.libellePlanning + ' a debuté le ' + this.dataPlanningArchiveForBull.dateDebut + ', et s\'est achervée le : ' + this.dataPlanningArchiveForBull.dateFin + ' avec une remontée de données ' + this.dataPlanningArchiveForBull.frequence + '. Et cette planification a été crée par ' + this.dataPlanningArchiveForBull.programmerPar;
            this.commentaireDefault = 'Inserer votre commentaire ici';
            this.isVisibleCommentaire = true;
            },
          (error) => {
            console.log(error)
          }
        );
      }
    );
    this.chargeRegion();
    this.chargeBaseQuestionnaire();
    this.chargeAllDataValide();
    this.loadBDFile();

  }

  loadBDFile() {
    this.serviceFile.getFicheCollectes().subscribe(
      (response) => {
        this.listFile = (<FicheCollecteM[]>response);
      },
      (error) => {
        console.log(error)
      }
    );
  }


  chargeBaseQuestionnaire() {
    this.serBDQuestionnaire.getBaseQuestionnaires().subscribe(
      (reponse) => {
        this.listBasequestionnaire = (<BaseQuestionnaireM[]>reponse);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  chargeAllDataValide() {
    this.serviceDataValide.getAnwserQuestion().subscribe(
      (response) => {
        this.listAllDataValide = (response as AnwserQuestions[]);
        this.initDonneevalid(this.dataPlanningArchiveForBull);
      },
      (error) => {
        console.log(error);
      }
    )
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
      }
    );
  }


  initDonneevalid(planning: NewPlanification) {

    if (this.listAllDataValide.length > 0) {
      this.dataFinalesFOrStat = [];

      for (let data of this.listAllDataValide) {

        let databrut = JSON.parse((<string>data.reponseJson));
        let databrutJSON: String[] = Object.keys(databrut);
        let y = 0;
        for (let i = 0; i < databrutJSON.length; i++) {
          if (databrutJSON[i] == 'Region') {
            y++;
          }
        }
        if (y > 0) {
          this.dataFinalesFOrStat.push(data);
        }
      }
      this.dataAsByFusioncharts = [];
      for (let itemregion of this.listregions) {
        itemregion.donnee = [];
        let itemReady = {'id': '', 'value': '', 'showLabel': ''};
        let ColorMaps = '#d92550';
        let getData: AnwserQuestions[] = [];
        for (let itemdatafinal of this.dataFinalesFOrStat) {
          if ((itemdatafinal.programmation as number) == planning.idOrigin) {
            let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
            if (itemregion.libelleRegionFR == itemdataJSON.Region) {
              getData.push(itemdatafinal);
            }
          }
        }
        if (getData.length >= 1) {
          itemregion.donnee.push({
            'label': 'bg-success',
            'taux': 0
          });
          for (let itemdatafinal of getData) {
            itemregion.donnee[0].taux += 1;
            ColorMaps = '#3ac47d';
            if (planning.dateFinInitiale != null) {
              let restreintDateData: string = itemdatafinal.create_le.toString().split('T')[0];
              let timeFromData = new Date(restreintDateData).getTime();
              let timePlanning = new Date(planning.dateFinInitiale.toString()).getTime();
              if (timePlanning >= timeFromData) {
                itemregion.donnee[0].label = 'bg-warning';
                ColorMaps = '#f7b924';
              }
            }
          }
        } else {
          itemregion.donnee.push({'label': 'bg-danger', 'taux': 0});
        }
        itemReady.id = itemregion.codeRegion;
        itemReady.value = (itemregion.donnee[0].taux as string)
        itemReady.showLabel = '1';
        this.dataAsByFusioncharts.push(itemReady);
        this.colorrange.color.push(
          {
            'minvalue': (itemregion.donnee[0].taux as string),
            'maxvalue': (itemregion.donnee[0].taux as string),
            'color': ColorMaps
          });
      }
      this.chart.caption = 'Cartographie de l\'évaluation de la promptitude d\'envoi de données : ';
      this.dataSource.chart = this.chart;
      this.dataSource.colorrange = this.colorrange;
      this.dataSource.data = this.dataAsByFusioncharts;
    }

    this.BaseNotificationWithFicheCollecte();
  }


  BaseNotificationWithFicheCollecte() {
    if (this.dataPlanningArchiveForBull != null || this.dataPlanningArchiveForBull != undefined) {
      if (this.dataPlanningArchiveForBull.baseQuestionnaires.length > 0) {
        for (let bdObj of this.dataPlanningArchiveForBull.baseQuestionnaires) {
          let listFiche: FicheCollecteM[] = this.chooseFile(bdObj.id);
          if (listFiche.length > 0) {
            for (let valNbreData of listFiche) {
              let nbreData: Array<AnwserQuestions> = this.onAfficheTable(valNbreData.id);

              let enteteData: string[] = [];

              let allDataInTable: any[] = [];
              let y = 0;
              let z = 0;
              if (nbreData.length > 0) {
                // @ts-ignore
                enteteData = Object.keys(JSON.parse(nbreData[0].reponseJson));
                for (let dataList of nbreData) {
                  // @ts-ignore
                  allDataInTable[dataList.id] = JSON.parse(dataList.reponseJson);

                  let databrut = JSON.parse((<string>dataList.reponseJson));
                  let databrutJSON: String[] = Object.keys(databrut);
                  for (let i = 0; i < databrutJSON.length; i++) {
                    let separelabelData = Object.assign([], databrutJSON[i]);
                    if (separelabelData[0] == '#' && separelabelData[1] != '%') {
                      y++;
                    }
                    if (separelabelData[0] == '#' && separelabelData[1] == '%') {
                      z++;
                    }
                  }

                }
              }

              let idPlanning = this.dataPlanningArchiveForBull.idOrigin;
              this.listFicheCollecteNbreData.push(
                new class implements TypeBaseNotificationForBulletin {
                  baseNotification: BaseQuestionnaireM = bdObj;
                  ficheForCollecte: FicheCollecteM = valNbreData;
                  nbreDataCollectee = nbreData.length;
                  iDplanification = idPlanning;
                  donneeValideBrut = nbreData;
                  dataHeard = enteteData;
                  donneeDetail = allDataInTable;
                  nbreIndicateurTaux = y;
                  nbreIndicateurPourcentage = z;
                }
              );
            }
          }
        }
      }
    }
  }

  chooseFile(idbdquestionnaire): FicheCollecteM[] {
    let listfileclone: FicheCollecteM[] = Object.assign([], this.listFile, []);
    let tempFchier: FicheCollecteM[] = [];
    for (let itemfilelogic of listfileclone) {
      if (itemfilelogic.baseQuestionnaire.id == idbdquestionnaire) {
        tempFchier.push(itemfilelogic);
      }
    }
    return tempFchier;
  }


  onAfficheTable(idfile): Array<AnwserQuestions> {
    let itemfileForhead: AnwserQuestions = this.listAllDataValide.find(element => element.ficheCollecte.id == idfile && (element.programmation as number) == this.dataPlanningArchiveForBull.idOrigin);
    if (itemfileForhead != undefined) {
      let listdataclone: AnwserQuestions[] = Object.assign([], this.listAllDataValide, []);
      let tempfileEntete: Array<AnwserQuestions> = [];
      for (let dataconcerne of listdataclone) {
        if (dataconcerne.ficheCollecte.id == idfile) {
          if (this.dataPlanningArchiveForBull.idOrigin == (dataconcerne.programmation as number)) {
            tempfileEntete.push(dataconcerne);
          }
        }
      }
      return tempfileEntete;
    } else {
      return [];
    }
  }


  onGenerateBill() {
    //this.serviceNotification.inputValidation(this.dataPlanningArchiveForBull.id);

    const element = document.getElementById('content'),
      options = {
        imageTimeout: 2000,
        background: "white",
        allowTaint : true,
        useCORS: false,
        height: element.clientHeight,
        width: element.clientWidth
      };

    html2canvas(element, options).then((canvas) => {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;

      var pageHeight = contentWidth / 592.28 * 841.89;

      var leftHeight = contentHeight;

      var position = 0;

      var imgWidth = 595.28;
      var imgHeight = 592.28/contentWidth * contentHeight;
      var pageData = canvas.toDataURL('image/jpeg', 1.0);
      var pdf = new jsPDF('p', 'pt', 'a4');

      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
      } else {
        while(leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight;
          position -= 841.89;

          if(leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      pdf.save('content.pdf');
    });





   /* html2canvas(document.querySelector("#content"), { backgroundColor: "#ffffff"}).then(canvas => {
      var myImage = canvas.toDataURL("image/jpeg",5.0);
      // Adjust width and height
      //var imgWidth = (canvas.width * 20) / 120;
      var imgWidth = 210;
      //var imgHeight = (canvas.height * 20) / 120;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var pageHeight = 295;
      var heightLeft = imgHeight;
      // jspdf changes
      var pdf = new jsPDF('p', 'mm', 'a4');
      var position = 10;
      pdf.addImage(myImage, 'JPEG', 0, position, imgWidth, imgHeight); // 2: 19
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight; // top padding for other pages
        //position += 50;
        pdf.addPage();
        pdf.addImage(myImage, 'JPEG', 0, position, imgWidth, imgHeight);

        heightLeft -= pageHeight;
      }
      pdf.save('Download.pdf');
    });*/

    /*html2canvas(document.querySelector("#content")).then(canvas => {
      console.log(canvas);
      var pdfFile = new jsPDF('p', 'pt', [canvas.width, 1400]);
      var imgData  = canvas.toDataURL("image/jpeg", 5.0);
      pdfFile.addImage(imgData,'JPEG',0,0,canvas.width, canvas.height);
      pdfFile.save('sample.pdf');
    });*/

/*    const pdf = new jsPDF('p', 'px', 'A4');

      // @ts-ignore
    const promises = $('#content').map(function (index = 4, element) {
      return new Promise(function (resolve, reject) {
        html2canvas(element, {allowTaint: true, logging: true})
          .then(function (canvas) {
            resolve(canvas.toDataURL('image/jpeg', 5.0));
          })
          .catch(function (error) {
             reject('error in PDF page: ' + index);
          });
      });
    });

    Promise.all(promises).then(function (dataURLS) {
      for (let ind in dataURLS) {
        if (dataURLS.hasOwnProperty(ind)) {
          pdf.addImage(
            // @ts-ignore
            dataURLS[ind],
            'JPEG',
            0,
            0,
            pdf.internal.pageSize.getWidth(),
            pdf.internal.pageSize.getHeight(),
          );
        }
      }
      pdf.save('HTML-Document.pdf');
    });*/

  }






  onCommentaire(divElement: HTMLDivElement) {
    var elementInput = document.createElement('textarea');
    elementInput.value = divElement.firstElementChild.innerHTML;
    elementInput.name = 'CommentaireBulletin';
    elementInput.style.width = '100%';
    elementInput.style.height = '150px';

    divElement.replaceChild(elementInput, divElement.firstElementChild);

    elementInput.addEventListener('blur', (event) => {
      this.serviceNotification.configShowNotif.showLoading.text = 'Enregistrement encour';
      this.serviceNotification.configShowNotif.showLoading.show = true;
      let formaPlanningSaveCommentaireBulletin = new NewPlanification(
        this.dataPlanningArchiveForBull.id,
        this.dataPlanningArchiveForBull.libellePlanning,
        this.dataPlanningArchiveForBull.dateDebut,
        this.dataPlanningArchiveForBull.dateFin,
        this.dataPlanningArchiveForBull.frequence,
        this.dataPlanningArchiveForBull.dateEffictif,
        this.dataPlanningArchiveForBull.typeCloture,
        this.dataPlanningArchiveForBull.observations,
        null,
        this.dataPlanningArchiveForBull.baseQuestionnaires,
        this.dataPlanningArchiveForBull.objectif,
        this.dataPlanningArchiveForBull.programmerPar,
        this.dataPlanningArchiveForBull.dateFinInitiale,
        this.dataPlanningArchiveForBull.idOrigin,
        this.dataPlanningArchiveForBull.libellePlanningEN,
        this.dataPlanningArchiveForBull.observationsEN,
        this.dataPlanningArchiveForBull.objectifEN,
        elementInput.value,
      );
      this.servicePlanning.saveCommentaireBulletin(formaPlanningSaveCommentaireBulletin).subscribe(
        (response) => {
          this.serviceNotification.configShowNotif.showLoading.show = false;
          this.serviceNotification.openToast({
            titre: 'Notification',
            message: 'Enregistrement commentaire éffèctué avec succès',
            status: StatusNotification.SUCCESS
          });
          let elementSpan = document.createElement('span');
          elementSpan.innerHTML = elementInput.value;
          divElement.replaceChild(elementSpan, elementInput);
        },
        (error) => {
          console.log(error);
          let elementSpan = document.createElement('span');
          elementSpan.innerHTML = 'Inserer votre commentaire';
          divElement.replaceChild(elementSpan, elementInput);

          this.serviceNotification.openToast({
            titre: 'Notification',
            message: 'Echec de l\'Enregistrement du commentaire',
            status: StatusNotification.ERROR
          });
        }
      );
    });
  }


}
