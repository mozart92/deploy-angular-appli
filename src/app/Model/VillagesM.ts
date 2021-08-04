import {CzvsModel} from './CzvsModel';

export class VillagesM {


  id: number;
  libelleVillageFR : string;
  libelleVillageEN : string;
  czvsModel: CzvsModel;
  CZVSID: any;
  longitude: number;
  laltitude: number;
  altitude: number;


  constructor(id: number=null,
              libelleVillageFR: string=null,
              libelleVillageEN: string=null,
              czvsModel: CzvsModel=null,
              CZVSID: any =null,
              longitude: number=null,
              laltitude: number=null,
              altitude: number=null) {

    this.id = id;
    this.libelleVillageFR = libelleVillageFR;
    this.libelleVillageEN = libelleVillageEN;
    this.czvsModel = czvsModel;
    this.CZVSID = parseInt(CZVSID) ;
    this.longitude = longitude;
    this.laltitude = laltitude;
    this.altitude = altitude;
  }


}
