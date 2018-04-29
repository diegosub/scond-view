import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../dialog-service';
import { Base } from '../../base/base';
import { ResponseApi } from '../../../model/response-api';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { PagerService } from '../../../services/page.service';
import { Despesa } from '../../../model/despesa';
import { DespesaService } from '../../../services/despesa/despesa.service';
import { DespesaViewComponent } from '../view/despesa-view.component';


@Component({
  selector: 'app-despesa-list',
  templateUrl: './despesa-list.component.html',
  styleUrls: ['./despesa-list.component.css']
})

export class DespesaListComponent extends Base {

  despesaFilter = new Despesa(null,'','','','',null,null,null,null,'','','','','',null,null,null,null,'');

  v: number;

  constructor(private dialogService: DialogService,
              private route: ActivatedRoute,
              private router: Router,
              private pagerService: PagerService,
              private dialog: MatDialog,
              private spinnerService: Ng4LoadingSpinnerService,
              private despesaService: DespesaService) {
	  super();
  }

  ngOnInit() {
    this.despesaFilter.fgAtivo = 'T';
    this.pesquisar();
  }

  visualizar(id) {
    this.dialog.open(DespesaViewComponent, {height: '580px',
                                               width: '800px', data: {id: id}});
  }

  pesquisar(): void {
    this.spinnerService.show();
    this.despesaService.pesquisar(this.despesaFilter)
    .subscribe((responseApi:ResponseApi) => {
      this.lista = responseApi['data'];
      if(this.lista.length > 0) {
        this.setPage(1);
      }else{
        this.pagedItems = [];
      }
      this.spinnerService.hide();
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
      this.spinnerService.hide();
    });
  }

  inativar(id:string){
    this.dialogService.confirm('Tem certeza que deseja inativar esta despesa?')
      .then((candelete:boolean) => {
          if(candelete){
            this.spinnerService.show();
            this.message = {};
            let status = 'N';
            this.despesaService.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `O registro foi inativado com sucesso.`
                });

                //ATUALIZANDO STATUS
                this.lista.forEach(function (value) {
                  if(value.idDespesa == id) {
                    value.fgAtivo = 'N';
                  }
                });

                this.spinnerService.hide();
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
              this.spinnerService.hide();
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
            this.despesaService.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `O registro foi ativado com sucesso.`
                });

                //ATUALIZANDO STATUS
                this.lista.forEach(function (value) {
                  if(value.idDespesa == id) {
                    value.fgAtivo = 'S';
                  }
                });

                this.spinnerService.hide();
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
              this.spinnerService.hide();
            });
          }
      });
  }

  soNumeros(){
    alert(this.v);
    //return v.replace(/\D/g,"") //Remove tudo o que não é dígito
  }

  editar(id:string){
    this.router.navigate(['/despesa-form',id]);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    this.pager = this.pagerService.getPager(this.lista.length, page);
    this.pagedItems = this.lista.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
