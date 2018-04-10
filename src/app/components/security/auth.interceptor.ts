import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { UtilService } from '../../services/util.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    util : UtilService;

    constructor() {        
        this.util = UtilService.getInstance();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
        let authRequest : any;
        if(this.util.isLoggedIn()){
            authRequest = req.clone({
                setHeaders: {
                    'Authorization' : localStorage.getItem("token")
                }
            });
            return next.handle(authRequest);
        } else {
            return next.handle(req);
        }
    }

}
