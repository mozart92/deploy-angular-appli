import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

export class IntercepteurClass implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem("accessToken");
        const typeToken = localStorage.getItem("tokenType");
         let url: String[] = req.url.split("/");

         let lastParamUrl = url[url.length-1];

        if (token && lastParamUrl!="authentification"){

            let reqHeader = new HttpHeaders({
                /*'Content-Type': 'application/json',*/
                'Authorization': typeToken+" "+token,
              'User_Connect' : localStorage.getItem("token")
            });

            let cloneReq = req.clone(
                {
                    headers: reqHeader,
                })
            return next.handle(cloneReq);
        }else {
            return next.handle(req);
        }
    }
}

export const InterceptorClassProvider = {
    provide : HTTP_INTERCEPTORS,
    useClass : IntercepteurClass,
    multi : true
}
