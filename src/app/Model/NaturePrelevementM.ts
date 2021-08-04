import {CommuneM} from './CommuneM';

export class NaturePrelevementM {

  id: number;
  codeNaturePrelevement:string;
  libelleNaturePrelevementFR:string;
  libelleNaturePrelevementEN:string;


  constructor(id: number=null,
              codeNaturePrelevement: string=null,
              libelleNaturePrelevementFR: string=null,
              libelleNaturePrelevementEN: string = null) {
    this.id = id;
    this.codeNaturePrelevement = codeNaturePrelevement;
    this.libelleNaturePrelevementFR = libelleNaturePrelevementFR;
    this.libelleNaturePrelevementEN = libelleNaturePrelevementEN;
  }
}
