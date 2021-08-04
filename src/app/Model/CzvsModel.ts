import {CommuneM} from './CommuneM';

export class CzvsModel {

  id: number;
  codeCZVS:string;
  libelleCZVSFR:string;
  libelleCZVSEN:string;
  arrondissement: CommuneM;
  arrondissementID:  number;


  constructor(id: number=null,
              codeCZVS: string=null,
              libelleCZVSFR: string=null,
              libelleCZVSEN: string = null,
              arrondissement: CommuneM=null,
              arrondissementID: number=null) {
    this.id = id;
    this.codeCZVS = codeCZVS;
    this.libelleCZVSFR = libelleCZVSFR;
    this.libelleCZVSEN = libelleCZVSEN;
    this.arrondissement = arrondissement;
    this.arrondissementID = arrondissementID;
  }


}

