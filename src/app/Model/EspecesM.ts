
export class EspecesM {
  id: number;
  libelleEspeceFR : string;
  libelleEspeceEN : string;
  grpEspeces : string;


  constructor(id: number = null,
              libelleEspeceFR: string=null,
              libelleEspeceEN: string=null,
              grpEspeces: string=null) {
    this.id = id;
    this.libelleEspeceFR = libelleEspeceFR;
    this.libelleEspeceEN = libelleEspeceEN;
    this.grpEspeces = grpEspeces;
  }
}
