import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../dialog-service';
import { Base } from '../../base/base';
import { ResponseApi } from '../../../model/response-api';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { PagerService } from '../../../services/page.service';
import { CartaoService } from '../../../services/cartao/cartao.service';
import { Cartao } from '../../../model/cartao';
import { CartaoViewComponent } from '../view/cartao-view.component';


@Component({
  selector: 'app-cartao-list',
  templateUrl: './cartao-list.component.html',
  styleUrls: ['./cartao-list.component.css']
})

export class CartaoListComponent extends Base {

  cartaoFilter = new Cartao(null,'','','','','');

  constructor(private dialogService: DialogService,
              private route: ActivatedRoute,
              public router: Router,
              private pagerService: PagerService,
              private dialog: MatDialog,
              private spinnerService: Ng4LoadingSpinnerService,
              private cartaoService: CartaoService) {
	  super(router);
  }

  ngOnInit() {
    this.cartaoFilter.fgAtivo = 'T';
    this.pesquisar();
  }

  visualizar(id) {
    this.dialog.open(CartaoViewComponent, {height: '350px',
                                               width: '800px', data: {id: id}});
  }

  pesquisar(): void {
    this.spinnerService.show();
    this.cartaoService.pesquisar(this.cartaoFilter)
    .subscribe((responseApi:ResponseApi) => {
      this.lista = responseApi['data'];
      if(this.lista.length > 0) {
        this.setPage(1);
      }else{
        this.pagedItems = [];
      }
      this.spinnerService.hide();
    } , err => {
      this.spinnerService.hide();
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  inativar(id:string){
    this.dialogService.confirm('Tem certeza que deseja inativar este cartão?')
      .then((candelete:boolean) => {
          if(candelete){
            this.spinnerService.show();
            this.message = {};
            let status = 'N';
            this.cartaoService.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `O registro foi inativado com sucesso.`
                });

                //ATUALIZANDO STATUS
                this.lista.forEach(function (value) {
                  if(value.idCartao == id) {
                    value.fgAtivo = 'N';
                  }
                });

                this.spinnerService.hide();
            } , err => {
              this.spinnerService.hide();
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
          }
      });
  }

  ativar(id:string){
    this.dialogService.confirm('Tem certeza que deseja ativar este cartão?')
      .then((candelete:boolean) => {
          if(candelete){
            this.spinnerService.show();
            this.message = {};
            let status = 'S';
            this.cartaoService.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `O registro foi ativado com sucesso.`
                });

                //ATUALIZANDO STATUS
                this.lista.forEach(function (value) {
                  if(value.idCartao == id) {
                    value.fgAtivo = 'S';
                  }
                });

                this.spinnerService.hide();
            } , err => {
              this.spinnerService.hide();
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
          }
      });
  }

  editar(id:string){
    this.router.navigate(['/cartao-form',id]);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    this.pager = this.pagerService.getPager(this.lista.length, page);
    this.pagedItems = this.lista.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
