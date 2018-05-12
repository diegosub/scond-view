import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Estabelecimento } from '../../../model/estabelecimento';
import { ResponseApi } from '../../../model/response-api';
import { EstabelecimentoService } from '../../../services/estabelecimento/estabelecimento.service';
import { Base } from '../../base/base';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-estabelecimento-view',
  templateUrl: './estabelecimento-view.component.html',
  styleUrls: ['./estabelecimento-view.component.css']
})
export class EstabelecimentoViewComponent extends Base {

  estabelecimento = new Estabelecimento(null,'','','','','');

  constructor(private route: ActivatedRoute,
              private dialogRef: MatDialogRef<EstabelecimentoViewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private spinnerService: Ng4LoadingSpinnerService,
              public router: Router,
              private estabelecimentoService: EstabelecimentoService) {
	  super(router);
  }

  ngOnInit() {
    if(this.data.id != undefined){
      this.get(this.data.id);
    }
  }

  get(id:string){
    this.spinnerService.show();
    this.estabelecimentoService.get(id).subscribe((responseApi:ResponseApi) => {
      this.estabelecimento = responseApi.data;
      this.spinnerService.hide();
    } , err => {
      this.spinnerService.hide();
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  fechar() {
    this.dialogRef.close();
  }

}
