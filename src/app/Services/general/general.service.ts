import { Injectable } from '@angular/core';
import {ProfilGroupPerso} from '../../Model/ProfilGroupPerso';
import {NewPlannificationService} from '../newPlannification/new-plannification.service';
import {NewPlanification} from '../../Model/NewPlanification';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  isAuthorizate(namePage: String){

    let privilsUser = JSON.parse(localStorage.getItem("privilsUser"));

    let formatprivilUsers: string[] = (<string[]>privilsUser);

    for (let itemprivil of formatprivilUsers){
      if (itemprivil == namePage){
          return true;
      }
    }
    return false;

  }

}
