export class TypeVaccinM {

  id: number;
  codeTypeVaccin:string;
  libelleTypeVaccinFR:string;
  libelleTypeVaccinEN:string;


  constructor(id: number=null,
              codeTypeVaccin: string=null,
              libelleTypeVaccinFR: string=null,
              libelleTypeVaccinEN: string = null) {
    this.id = id;
    this.codeTypeVaccin = codeTypeVaccin;
    this.libelleTypeVaccinFR = libelleTypeVaccinFR;
    this.libelleTypeVaccinEN = libelleTypeVaccinEN;
  }

}
