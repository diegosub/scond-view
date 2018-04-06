import { HOST_SCOND } from './../scond.api';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../model/usuario';


@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) {}

  login(usuario: Usuario){
    alert(usuario.dsLogin);
    alert(usuario.dsSenha);
    return this.http.post(`${HOST_SCOND}/api/auth`, usuario);
  }

  createOrUpdate(usuario: Usuario){
    if(usuario.idUsuario != null && usuario.idUsuario > 0){
      return this.http.put(`${HOST_SCOND}/api/usuario`, usuario);
    } else {
      usuario.idUsuario = null;
      return this.http.post(`${HOST_SCOND}/api/usuario`, usuario);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${HOST_SCOND}/api/usuario/${page}/${count}`);
  }

  findById(idUsuario: number){
    return this.http.get(`${HOST_SCOND}/api/usuario/${idUsuario}`);
  }

  delete(idUsuario: number){
    return this.http.delete(`${HOST_SCOND}/api/usuario/${idUsuario}`);
  }
}
