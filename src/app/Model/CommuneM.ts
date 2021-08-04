import {DepartementM} from './departementM';


export class CommuneM {

  id:number;
  codeCommune: string;
  libelleCommuneFR: string;
  libelleCommuneEN: string;
  departementCommune:any;
  departement: DepartementM;
  donnee: Array<any| {"label":string, "taux":number}> = [];




  constructor(id=1, codeCommune = '', libelleCommuneFR = '', libelleCommuneEN = '', departementCommune = '',departement?, donnee? ) {
    this.id = id;
    this.codeCommune = codeCommune;
    this.libelleCommuneFR = libelleCommuneFR;
    this.libelleCommuneEN = libelleCommuneEN;
    this.departementCommune = departementCommune;
    this.donnee = donnee;
    this.departement = departement;
  }
}

