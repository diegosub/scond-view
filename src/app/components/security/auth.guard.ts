import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Route, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { TokenService } from '../../services/token/token.service';
import { UtilService } from '../../services/util.service';


@Injectable()
export class AuthGuard implements CanActivate {

  util : UtilService;

  constructor(private tokenService: TokenService,
              private router: Router) {
      this.util = UtilService.getInstance();
  }

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): Observable<boolean> | boolean {

    if(this.util.isLoggedIn()){
        return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  validateToken():boolean {
    let login = JSON.parse(localStorage.getItem("usuario")).dsLogin;
    alert(login);

    if(login != null) {
      this.tokenService.validateAuthenticationToken(login)
        .subscribe(() => {
          alert();
          return true;
        } , err => {
          alert('false1');
          return false;
        });
    } else {
      alert('false2');
      return false;
    }

  }

}
