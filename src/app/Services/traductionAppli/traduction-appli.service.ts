import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TraductionAppliService {

  currentLangue : string = localStorage.getItem("langue");


  versionLanguageApply(indice){

  }


  constructor() { }

  FICHE_COLLECTE = {
    1 : {
      FR : "Enregistrement des fiches de collectes",
      EN : "Enregistrement des fiches de collectes"
    },
    2 : {
      FR : "Informations générales",
      EN : "Informations générales"
    },
    3 : {
      FR : "Annuler",
      EN : "Annuler"
    },
    4 : {
      FR : "Nom de la fiche de collecte de données",
      EN : "Nom de la fiche de collecte de données"
    }
  }

  BULLETIN_LISTE = {
    1 : {
      FR : "Enregistrement des fiches de collectes",
      EN : "Enregistrement des fiches de collectes"
    },
    2 : {
      FR : "Informations générales",
      EN : "Informations générales"
    },
    3 : {
      FR : "Annuler",
      EN : "Annuler"
    },
    4 : {
      FR : "Nom de la fiche de collecte de données",
      EN : "Nom de la fiche de collecte de données"
    }
  }


}
