import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Categoria } from '../../../model/categoria';
import { ResponseApi } from '../../../model/response-api';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Base } from '../../base/base';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-categoria-view',
  templateUrl: './categoria-view.component.html',
  styleUrls: ['./categoria-view.component.css']
})
export class CategoriaViewComponent extends Base {

  categoria = new Categoria(null,'','','','','');

  constructor(private route: ActivatedRoute,
              private dialogRef: MatDialogRef<CategoriaViewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private spinnerService: Ng4LoadingSpinnerService,
              public router: Router,
              private categoriaService: CategoriaService) {
	  super(router);
  }

  ngOnInit() {
    if(this.data.id != undefined){
      this.get(this.data.id);
    }
  }

  get(id:string){
    this.spinnerService.show();
    this.categoriaService.get(id).subscribe((responseApi:ResponseApi) => {
      this.categoria = responseApi.data;
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
