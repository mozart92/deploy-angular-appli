import {RegionM} from './RegionM';


export class DepartementM {

    id:number;
    codeDepartement: string;
    libelleDepartementFR: string;
    libelleDepartementEN: string;
    regionDepartement:any;
    region: RegionM;
    donnee: Array<any| {"label":string, "taux":number}> = [];




    constructor(id=1, codeDepartement = '', libelleDepartementFR = '', libelleDepartementEN = '', regionDepartement = '',region?, donnee?) {
        this.id = id;
        this.codeDepartement = codeDepartement;
        this.libelleDepartementFR = libelleDepartementFR;
        this.libelleDepartementEN = libelleDepartementEN;
        this.regionDepartement = regionDepartement;
        this.donnee = donnee;
        this.region = region;
    }
}

