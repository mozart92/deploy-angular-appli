import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {ProfilGroupService} from '../Services/profilGroup/profil-group.service';
import {ProfilGroupPerso} from '../Model/ProfilGroupPerso';

@Injectable()
export class ConsulDatas implements CanActivate{

    private namePage: String = "Consultation des données";

    constructor(private serviceprivil: ProfilGroupService) {
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

        return false;


    }

}