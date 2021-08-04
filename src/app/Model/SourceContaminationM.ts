export class SourceContaminationM {

  id: number;
  codeSourceContamination:string;
  libelleSourceContaminationFR:string;
  libelleSourceContaminationEN:string;


  constructor(id: number=null,
              codeSourceContamination: string=null,
              libelleSourceContaminationFR: string=null,
              libelleSourceContaminationEN: string = null) {
    this.id = id;
    this.codeSourceContamination = codeSourceContamination;
    this.libelleSourceContaminationFR = libelleSourceContaminationFR;
    this.libelleSourceContaminationEN = libelleSourceContaminationEN;
  }

}
