import {CzvsModel} from './CzvsModel';

export class LaboratoiresM {

  id: number;
  libelleLaboratoireFR : string;
  libelleLaboratoireEN : string;
  czvsModel: CzvsModel;
  CZVSID: number;
  longitude: number;
  laltitude: number;
  altitude: number;


  constructor(id: number=null,
              libelleLaboratoireFR: string=null,
              libelleLaboratoireEN: string=null,
              czvsModel: CzvsModel=null,
              CZVSID: number=null,
              longitude: number=null,
              laltitude: number=null,
              altitude: number=null) {

    this.id = id;
    this.libelleLaboratoireFR = libelleLaboratoireFR;
    this.libelleLaboratoireEN = libelleLaboratoireEN;
    this.czvsModel = czvsModel;
    this.CZVSID = CZVSID;
    this.longitude = longitude;
    this.laltitude = laltitude;
    this.altitude = altitude;



}

}




