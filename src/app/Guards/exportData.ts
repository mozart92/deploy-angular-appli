import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ProfilGroupService} from '../Services/profilGroup/profil-group.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ExportData implements CanActivate{

    private namePage: String = "Exportatiion des données";

    constructor(private serviceprivil: ProfilGroupService) {
    }


    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean |
                                              UrlTree> |
                                              Promise<boolean |
                                              UrlTree> | boolean | UrlTree {
        return undefined;
    }

}