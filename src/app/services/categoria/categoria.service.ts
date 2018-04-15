import { HOST_SCOND } from './../scond.api';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../model/usuario';
import { Categoria } from '../../model/categoria';


@Injectable()
export class CategoriaService {

  constructor(private http: HttpClient) {}

  createOrUpdate(categoria: Categoria){
    if(categoria.idCategoria != null && categoria.idCategoria > 0){
      return this.http.put(`${HOST_SCOND}/api/categoria`, categoria);
    } else {
      categoria.idCategoria = null;
      return this.http.post(`${HOST_SCOND}/api/categoria`, categoria);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${HOST_SCOND}/api/categoria/${page}/${count}`);
  }

  ativarInativar(id:string, status:string){
    alert(id);
    alert(status);
    return this.http.delete(`${HOST_SCOND}/api/categoria/${id}/${status}`);
  }

}
