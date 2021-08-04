export class PathologiesM {
  id: number;
  codePathologie:string;
  libellePathologieFR:string;
  libellePathologieEN:string;


  constructor(id: number=null,
              codePathologie: string=null,
              libellePathologieFR: string=null,
              libellePathologieEN: string = null) {
    this.id = id;
    this.codePathologie = codePathologie;
    this.libellePathologieFR = libellePathologieFR;
    this.libellePathologieEN = libellePathologieEN;
  }
}
