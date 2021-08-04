export class MesuresControleM {
  id: number;
  codeMesuresControle:string;
  libelleMesuresControleFR:string;
  libelleMesuresControleEN:string;


  constructor(id: number=null,
              codeMesuresControle: string=null,
              libelleMesuresControleFR: string=null,
              libelleMesuresControleEN: string = null) {
    this.id = id;
    this.codeMesuresControle = codeMesuresControle;
    this.libelleMesuresControleFR = libelleMesuresControleFR;
    this.libelleMesuresControleEN = libelleMesuresControleEN;
  }
}
