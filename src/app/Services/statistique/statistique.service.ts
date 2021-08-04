import {Injectable, OnInit} from '@angular/core';
import {AnwserQuestionsService} from '../anwserQuestions/anwser-questions.service';
import {RegionService} from '../Region/region.service';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService implements OnInit {

  constructor(public serviceregion: RegionService,
              public servicedonnevalide: AnwserQuestionsService) {
      /*onsole.log("CONTROLLER DINITIALISATION")
      this.chargeRegion();
      this.initDonneevalid();*/
  }
/*
  legendeAffichageCarte = [];
  listDataForStat: AnwserQuestions[] = [];
  dataFinalesFOrStat: AnwserQuestions[] = [];
  listregions: RegionM[] = [];*/



  ngOnInit(): void {
/*console.log("METHODE DINITIALISATION")*/

  }



/*

  chargeRegion(){
    this.serviceregion.getRegions().subscribe(
        (reponse)=>{
            console.log("DONNEES BRUT DES REGIONS  :",reponse)
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
            //console.log(regionInit);
            this.listregions.push(regionInit);
          }

          console.log("INITIALISATION DES RREGIONS DANS LE SERVICE  :", this.listregions);

        },
        (error)=>{
          console.log(error);
        }
    )
  }

*/







    /*initDonneevalid(nameRegion?: String) {
      let curentRegion:RegionM = null;
    this.legendeAffichageCarte = [];
    this.servicedonnevalide.getAllAnwserQuestionsofFileByDefault().subscribe(
        (reponse) => {

            console.log("VALEURS BRUTS DES DONNEES DEJA VALIDEE  :", reponse)

          this.listDataForStat = (<AnwserQuestions[]>reponse);

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
                z++;
                let valeurretour = this.legendeAffichageCarte.find((element) => element == databrutJSON[i]);

                if (valeurretour == undefined) {
                  this.legendeAffichageCarte.push(databrutJSON[i]);
                }
              }

            }
            if (y > 0 && z > 0) {
              this.dataFinalesFOrStat.push(data);
            }

          }
          console.log(' VALEUR POUR LA LEGENDE  :', this.dataFinalesFOrStat);
          let regionDefault: RegionM ;
          if (nameRegion==undefined){console.log("KONKON")
            regionDefault = this.listregions.find(element => element.elementStatDefault!=null);
          }else {
            console.log("KON")
            regionDefault = this.listregions.find(element => element.libelleRegionFR==nameRegion);
          }


          let taux: number = 0;
          let getData: AnwserQuestions[] = [];
          for (let itemdatafinal of this.dataFinalesFOrStat) {
            let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
            if (regionDefault.libelleRegionFR == itemdataJSON.Region) {
              getData.push(itemdatafinal)
            }
          }

          console.log("LES VALEUR CHOISIR POUR LA REGION  :", regionDefault);
          console.log("LES DATAS DE LA REGION  :  "+regionDefault.libelleRegionFR, getData);

          if (getData.length>=1) {

            for (let itemdatafinal of getData) {
              let itemdataJSON = JSON.parse((<string>itemdatafinal.reponseJson));
              // @ts-ignore
              taux += parseInt(itemdataJSON[this.legendeAffichageCarte[this.legendeAffichageCarte.length - 1]]);

              for (let y = 0; y < this.legendeAffichageCarte.length; y++) {
                if (regionDefault.donnee.length <= 0) {


                  regionDefault.donnee.push({
                    'label': this.legendeAffichageCarte[y],
                    // @ts-ignore
                    'taux': parseInt(itemdataJSON[this.legendeAffichageCarte[y]])
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
                    regionDefault.donnee[index].taux += parseInt(itemdataJSON[this.legendeAffichageCarte[y]]);
                  }
                  if (verifie == false) {

                    regionDefault.donnee.push({
                      'label': this.legendeAffichageCarte[y],
                      // @ts-ignore
                      'taux': parseInt(itemdataJSON[this.legendeAffichageCarte[y]])
                    });
                  }
                }
              }
            }
          }

            console.log("LE TERMINATOR :", regionDefault);
          curentRegion = regionDefault;

          //return regionDefault;



         /!* let i = 0;
          for (let itemregiondonnee of regionDefault.donnee){
            this.pieChartLabels.push(itemregiondonnee.label);
            this.pieChartData.push(itemregiondonnee.taux);
            this.pieChartColors[0].backgroundColor.push(this.tabColor[i]);
            i++;
          }*!/

         // console.log('DONNEES COLLECTEE FILTER FINALE  :', regionDefault);
        },
        (error) => {
          console.log(error);
        }
    );

    return curentRegion;

  }
*/






}
