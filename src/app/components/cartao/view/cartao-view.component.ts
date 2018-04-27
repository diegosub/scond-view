import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ResponseApi } from '../../../model/response-api';
import { Base } from '../../base/base';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Cartao } from '../../../model/cartao';
import { CartaoService } from '../../../services/cartao/cartao.service';

@Component({
  selector: 'app-cartao-view',
  templateUrl: './cartao-view.component.html',
  styleUrls: ['./cartao-view.component.css']
})
export class CartaoViewComponent extends Base {

  cartao = new Cartao(null,'','','','','');

  constructor(private route: ActivatedRoute,
              private dialogRef: MatDialogRef<CartaoViewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private spinnerService: Ng4LoadingSpinnerService,
              private cartaoService: CartaoService) {
	  super();
  }

  ngOnInit() {
    if(this.data.id != undefined){
      this.get(this.data.id);
    }
  }

  get(id:string){
    this.spinnerService.show();
    this.cartaoService.get(id).subscribe((responseApi:ResponseApi) => {
      this.cartao = responseApi.data;
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
