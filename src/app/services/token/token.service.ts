import { HOST_SCOND } from './../scond.api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../model/usuario';

@Injectable()
export class TokenService {

  constructor(private http: HttpClient) {}

  validateAuthenticationToken(login: string){

    let token = localStorage.getItem("token");
    let headers = new HttpHeaders().set('Authorization', token);

    return this.http.post(`${HOST_SCOND}/api/validate`, login, {headers});
  }

}
