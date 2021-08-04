import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {ProfilGroupService} from '../Services/profilGroup/profil-group.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ModeProductionService} from '../PlatesFormes/mode-production.service';

@Injectable()
export class CzvsGuard implements CanActivate{

  private namePage: String = "Gestion CZVs";


  constructor(private servicePrivil: ProfilGroupService, private route : Router, private mode : ModeProductionService) {
    this.namePage = mode.MODE == "cahis" ? "Gestion CZVs" : "";
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
