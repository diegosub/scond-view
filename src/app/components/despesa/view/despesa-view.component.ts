import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ResponseApi } from '../../../model/response-api';
import { Base } from '../../base/base';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Despesa } from '../../../model/despesa';
import { DespesaService } from '../../../services/despesa/despesa.service';


@Component({
  selector: 'app-despesa-view',
  templateUrl: './despesa-view.component.html',
  styleUrls: ['./despesa-view.component.css']
})
export class DespesaViewComponent extends Base {

  despesa = new Despesa(null,'','','','','',null,'','','','','','','');

  constructor(private route: ActivatedRoute,
              private dialogRef: MatDialogRef<DespesaViewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private spinnerService: Ng4LoadingSpinnerService,
              private despesaService: DespesaService) {
	  super();
  }

  ngOnInit() {
    if(this.data.id != undefined){
      this.get(this.data.id);
    }
  }

  get(id:string){
    this.spinnerService.show();
    this.despesaService.get(id).subscribe((responseApi:ResponseApi) => {
      this.despesa = responseApi.data;
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
