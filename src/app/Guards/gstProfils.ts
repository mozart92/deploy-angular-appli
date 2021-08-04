import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ProfilGroupService} from '../Services/profilGroup/profil-group.service';
import {Injectable} from '@angular/core';
import {ProfilGroupPerso} from '../Model/ProfilGroupPerso';

@Injectable()
export class GstProfils implements CanActivate{


    private namePage: String = "Gestion des profils";

    constructor(private serviceprivil: ProfilGroupService) {
    }


    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let privilsUser = JSON.parse(localStorage.getItem("privilsUser"));
        let formatprivilUsers: string[] = (<string[]>privilsUser);


        for (let itemprivil of formatprivilUsers){
            if (itemprivil == this.namePage){
                return true;
            }
        }

        return false;
    }

}