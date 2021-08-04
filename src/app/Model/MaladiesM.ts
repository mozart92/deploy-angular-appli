export class MaladiesM {
  id: number;
  libelleMaladieFR:string;
  libelleMaladieEN:string;
  groupMalagie: string;


  constructor(id: number=null,
              libelleMaladieFR: string=null,
              libelleMaladieEN: string = null,
              groupMalagie: string=null) {
    this.id = id;
    this.libelleMaladieFR = libelleMaladieFR;
    this.libelleMaladieEN = libelleMaladieEN;
    this.groupMalagie = groupMalagie;
  }

}
