import { Injectable } from '@angular/core';

export enum TypeModeAffichageIndiceStat {
  MODE_TAUX="Mode Taux",
  MODE_POURCENTAGE="Mode Pourcentage"
}


@Injectable()
export class ModeProductionService {

 MODE : string = "syrem";
 //MODE : string = "cahis";

  public MODE_AFFICHAGE = TypeModeAffichageIndiceStat.MODE_TAUX;

}
