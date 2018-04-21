import { HOST_SCOND } from './../scond.api';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../model/usuario';
import { Estabelecimento } from '../../model/estabelecimento';


@Injectable()
export class EstabelecimentoService {

  constructor(private http: HttpClient) {}

  createOrUpdate(estabelecimento: Estabelecimento) {
    if(estabelecimento.idEstabelecimento != null && estabelecimento.idEstabelecimento > 0){
      return this.http.put(`${HOST_SCOND}/api/estabelecimento`, estabelecimento);
    } else {
      estabelecimento.idEstabelecimento = null;
      return this.http.post(`${HOST_SCOND}/api/estabelecimento`, estabelecimento);
    }
  }

  pesquisar(estabelecimento:Estabelecimento){
    return this.http.post(`${HOST_SCOND}/api/estabelecimento/pesquisar`, estabelecimento);
  }

  get(id: string) {
    return this.http.get(`${HOST_SCOND}/api/estabelecimento/${id}`);
  }

  ativarInativar(id:string, status:string) {
    return this.http.delete(`${HOST_SCOND}/api/estabelecimento/${id}/${status}`);
  }

}
