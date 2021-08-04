import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ProfilGroupService} from '../Services/profilGroup/profil-group.service';
import {Injectable} from '@angular/core';
import {ProfilGroupPerso} from '../Model/ProfilGroupPerso';
import {ModeProductionService} from '../PlatesFormes/mode-production.service';

@Injectable()
export class GstBaseQuestionnaires implements CanActivate{

    private namePage: String = "Nouvelle base de notification";


    constructor(private servicePrivil: ProfilGroupService, private route : Router, private mode : ModeProductionService) {
      this.namePage = mode.MODE == "cahis" ? "Nouvelle base de notification" : "Gestion des questionnaires";
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
        console.log("je suis arrivé ici et toi ?");
        this.route.navigate(['pages/authentification']);
        return false;
    }
}
