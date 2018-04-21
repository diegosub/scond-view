import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Segmento } from '../../../model/segmento';
import { ResponseApi } from '../../../model/response-api';
import { SegmentoService } from '../../../services/segmento/segmento.service';
import { Base } from '../../base/base';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Categoria } from '../../../model/categoria';

@Component({
  selector: 'app-segmento-view',
  templateUrl: './segmento-view.component.html',
  styleUrls: ['./segmento-view.component.css']
})
export class SegmentoViewComponent extends Base {

  segmento = new Segmento(null,'',null,'','','','', new Categoria(null, '','','','',''));

  constructor(private route: ActivatedRoute,
              private dialogRef: MatDialogRef<SegmentoViewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private spinnerService: Ng4LoadingSpinnerService,
              private segmentoService: SegmentoService) {
	  super();
  }

  ngOnInit() {

    if(this.data.id != undefined){

      this.get(this.data.id);

    }
  }

  get(id:string){
    this.spinnerService.show();
    this.segmentoService.get(id).subscribe((responseApi:ResponseApi) => {
      this.segmento = responseApi.data;
      this.spinnerService.hide();
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
      this.spinnerService.hide();
    });
  }

  fechar() {
    this.dialogRef.close();
  }

}
