export class OIEM {
  id: number;
  codeOIE:string;
  libelleOIEFR:string;
  libelleOIEEN:string;


  constructor(id: number=null,
              codeOIE: string=null,
              libelleOIEFR: string=null,
              libelleOIEEN: string = null) {
    this.id = id;
    this.codeOIE = codeOIE;
    this.libelleOIEFR = libelleOIEFR;
    this.libelleOIEEN = libelleOIEEN;
  }
}
