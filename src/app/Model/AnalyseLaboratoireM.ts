export class AnalyseLaboratoireM {

  id: number;
  codeAnalyseLaboratoire:string;
  libelleAnalyseLaboratoireFR:string;
  libelleAnalyseLaboratoireEN:string;

  constructor(id: number=null,
              codeAnalyseLaboratoire: string=null,
              libelleAnalyseLaboratoireFR: string=null,
              libelleAnalyseLaboratoireEN: string = null) {
    this.id = id;
    this.codeAnalyseLaboratoire = codeAnalyseLaboratoire;
    this.libelleAnalyseLaboratoireFR = libelleAnalyseLaboratoireFR;
    this.libelleAnalyseLaboratoireEN = libelleAnalyseLaboratoireEN;

  }


}
