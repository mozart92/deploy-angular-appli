import {FicheCollecteM} from './FicheCollecteM';


export class ElementsFicheM {


  id: number;
  labelChamp: string;
  labelChampEN: string;
  alias: string;
  typeChamp: string;
  cadreAffichage: string;
  propriete: any;
  ficheElementID: number | string;
  ficheCollecte: FicheCollecteM;
  baseElementStatGeneral: any;
  indicateurSiteWeb: any;


  constructor(id = null, labelChamp = '', labelChampEN = '', alias = '', typeChamp = '', cadreAffichage = null, propriete = '', ficheElementID = null, ficheCollecte = null, baseElementStatGeneral?) {
    this.id = id;
    this.labelChamp = labelChamp;
    this.labelChampEN = labelChampEN;
    this.alias = alias;

    console.log(labelChamp, baseElementStatGeneral)
    if (baseElementStatGeneral == true) {
      this.baseElementStatGeneral = id;
    } else {
      this.baseElementStatGeneral = null
    }

    if (ficheElementID == null && typeChamp == 'select') {
      const optionSelect = propriete.split(';');
      this.propriete = optionSelect;
    } else if (ficheElementID == 'update' && typeChamp == 'select') {
      this.propriete = propriete;
      this.ficheElementID = null;
    } else {
      this.propriete = propriete;
    }


    if (cadreAffichage == '') {
      this.cadreAffichage = null;
    } else {
      this.cadreAffichage = cadreAffichage;
    }


    this.typeChamp = typeChamp;
    this.ficheElementID = ficheElementID;
    this.ficheCollecte = ficheCollecte;
  }
}

