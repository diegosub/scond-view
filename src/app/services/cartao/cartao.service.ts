import { HOST_SCOND } from './../scond.api';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../model/usuario';
import { Cartao } from '../../model/cartao';


@Injectable()
export class CartaoService {

  constructor(private http: HttpClient) {}

  createOrUpdate(cartao: Cartao) {
    if(cartao.idCartao != null && cartao.idCartao > 0){
      return this.http.put(`${HOST_SCOND}/api/cartao`, cartao);
    } else {
      cartao.idCartao = null;
      return this.http.post(`${HOST_SCOND}/api/cartao`, cartao);
    }
  }

  pesquisar(cartao:Cartao){
    return this.http.post(`${HOST_SCOND}/api/cartao/pesquisar`, cartao);
  }

  get(id: string) {
    return this.http.get(`${HOST_SCOND}/api/cartao/${id}`);
  }

  ativarInativar(id:string, status:string) {
    return this.http.delete(`${HOST_SCOND}/api/cartao/${id}/${status}`);
  }

}
