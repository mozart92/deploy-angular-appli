import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ProfilGroupService} from '../Services/profilGroup/profil-group.service';
import {Injectable} from '@angular/core';
import {ProfilGroupPerso} from '../Model/ProfilGroupPerso';
import {ModeProductionService} from '../PlatesFormes/mode-production.service';

@Injectable()
export class NewPlanificationGuard implements CanActivate{

  private namePage: String = "nouvelle programmation";


  constructor(private servicePrivil: ProfilGroupService, private route : Router, private mode : ModeProductionService) {
    this.namePage = mode.MODE == "cahis" ? "nouvelle programmation" : "nouvelle planification";
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean |
    UrlTree> |
    Promise<boolean |
      UrlTree> | boolean | UrlTree {

    let privilsUser = JSON.parse(localStorage.getItem("privilsUser"));

    let formatprivilUsers: string[] = (<string[]>privilsUser);

    for (let itemprivil of formatprivilUsers){
      if (itemprivil == this.namePage){
        return true;
      }
    }

    this.route.navigate(['pages/authentification']);
    return false;
  }
}
