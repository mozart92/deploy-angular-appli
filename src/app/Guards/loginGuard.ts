import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class LoginGuard implements CanActivate{

    constructor(private route: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = localStorage.getItem("token");
        if (!token){
            this.route.navigate(['/pages/authentification']);
        }

        return !!token;
    }
}
