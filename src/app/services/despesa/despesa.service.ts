import { HOST_SCOND } from './../scond.api';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Despesa } from '../../model/despesa';


@Injectable()
export class DespesaService {

  constructor(private http: HttpClient) {}

  createOrUpdate(despesa: Despesa) {
    if(despesa.idDespesa != null && despesa.idDespesa > 0){
      return this.http.put(`${HOST_SCOND}/api/despesa`, despesa);
    } else {
      despesa.idDespesa = null;
      return this.http.post(`${HOST_SCOND}/api/despesa`, despesa);
    }
  }

  pesquisar(despesa: Despesa){
    return this.http.post(`${HOST_SCOND}/api/despesa/pesquisar`, despesa);
  }

  get(id: string) {
    return this.http.get(`${HOST_SCOND}/api/despesa/${id}`);
  }

  ativarInativar(id:string, status:string) {
    return this.http.delete(`${HOST_SCOND}/api/despesa/${id}/${status}`);
  }

}
