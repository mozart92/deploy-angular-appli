export class Group{
      id: number;
      libelleGroupe: String;
      abreviation: String;
      description: String;
     grpAppartenent: Group[];
     typGroup: String;
     typeGroupes: String;

    constructor(id=0,libelleGrp='', abvrevia='', descrip='', grpApp= [], typgrp="") {
        this.id=id;
        this.libelleGroupe = libelleGrp;
        this.abreviation =abvrevia;
        this.description = descrip;
        this.typGroup = typgrp;
        if (grpApp){
            this.grpAppartenent = grpApp;
        }else {
            this.grpAppartenent = [];
        }
    }
}