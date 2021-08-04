

export class RegionM {

    id:number;
    codeRegion: string;
    libelleRegionFR: string;
    libelleRegionEN: string;
    donnee: Array<any| {"label":"", "taux":0}> = [];
    elementStatDefault:any;



    constructor(id=1, codeRegion = '', libelleRegionFR = '', libelleRegionEN = '', donnee?,elementStatDefault?) {
        this.id = id;
        this.codeRegion = codeRegion;
        this.libelleRegionFR = libelleRegionFR;
        this.libelleRegionEN = libelleRegionEN;
        this.donnee = donnee;
        if (elementStatDefault == true){
            this.elementStatDefault = id;
        }else {
            this.elementStatDefault = null
        }
    }
}

