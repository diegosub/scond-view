import { HOST_SCOND } from './../scond.api';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../model/usuario';
import { Segmento } from '../../model/segmento';


@Injectable()
export class SegmentoService {

  constructor(private http: HttpClient) {}

  createOrUpdate(segmento: Segmento) {
    if(segmento.idSegmento != null && segmento.idSegmento > 0){
      return this.http.put(`${HOST_SCOND}/api/segmento`, segmento);
    } else {
      segmento.idSegmento = null;
      return this.http.post(`${HOST_SCOND}/api/segmento`, segmento);
    }
  }

  pesquisar(segmento:Segmento){
    return this.http.post(`${HOST_SCOND}/api/segmento/pesquisar`, segmento);
  }

  get(id: string) {
    return this.http.get(`${HOST_SCOND}/api/segmento/${id}`);
  }

  ativarInativar(id:string, status:string) {
    return this.http.delete(`${HOST_SCOND}/api/segmento/${id}/${status}`);
  }

}
