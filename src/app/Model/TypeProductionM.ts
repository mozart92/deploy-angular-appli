export class TypeProductionM {


  id: number;
  codeTypeProduction:string;
  libelleTypeProductionFR:string;
  libelleTypeProductionEN:string;


  constructor(id: number=null,
              codeTypeProduction: string=null,
              libelleTypeProductionFR: string=null,
              libelleTypeProductionEN: string = null) {
    this.id = id;
    this.codeTypeProduction = codeTypeProduction;
    this.libelleTypeProductionFR = libelleTypeProductionFR;
    this.libelleTypeProductionEN = libelleTypeProductionEN;
  }

}
