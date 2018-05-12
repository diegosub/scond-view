import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    util : UtilService;

    constructor(private tokenService: TokenService,
                private router: Router) {
        this.util = UtilService.getInstance();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
        let authRequest : any;

        if(this.util.isLoggedIn()){
            let token = localStorage.getItem("token");
            let login = JSON.parse(localStorage.getItem("usuario")).dsLogin;

            authRequest = req.clone({
                setHeaders: {
                    'Authorization' : token
                }
            });
            return next.handle(authRequest).do((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                //token ok.. continua o processo (pode ser implementado a logica de sempre atualizar o token)
              }
            }, (err: any) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  //token expirado, realize o logout
                  localStorage.removeItem("usuario");
                  localStorage.removeItem("token");
                  this.router.navigate(['/login']);
                }
              }
            });
        } else {
            return next.handle(req);
        }
    }

}
