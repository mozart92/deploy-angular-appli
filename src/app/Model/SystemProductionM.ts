export class SystemProductionM {

  id: number;
  codeSystemProduction:string;
  libelleSystemProductionFR:string;
  libelleSystemProductionEN:string;


  constructor(id: number=null,
              codeSystemProduction: string=null,
              libelleSystemProductionFR: string=null,
              libelleSystemProductionEN: string = null) {
    this.id = id;
    this.codeSystemProduction = codeSystemProduction;
    this.libelleSystemProductionFR = libelleSystemProductionFR;
    this.libelleSystemProductionEN = libelleSystemProductionEN;
  }

}
