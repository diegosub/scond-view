import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../dialog-service';
import { SegmentoService } from '../../../services/segmento/segmento.service';
import { Segmento } from '../../../model/segmento';
import { Base } from '../../base/base';
import { ResponseApi } from '../../../model/response-api';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SegmentoViewComponent } from '../view/segmento-view.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { PagerService } from '../../../services/page.service';


@Component({
  selector: 'app-segmento-list',
  templateUrl: './segmento-list.component.html',
  styleUrls: ['./segmento-list.component.css']
})

export class SegmentoListComponent extends Base {

  segmentoFilter = new Segmento(null,'',null,'','','','');

  constructor(private dialogService: DialogService,
              private route: ActivatedRoute,
              private router: Router,
              private pagerService: PagerService,
              private dialog: MatDialog,
              private spinnerService: Ng4LoadingSpinnerService,
              private segmentoService: SegmentoService) {
	  super();
  }

  ngOnInit() {
    this.segmentoFilter.fgAtivo = 'T';
    this.pesquisar();
  }

  visualizar(id) {
    this.dialog.open(SegmentoViewComponent, {height: '350px',
                                               width: '800px', data: {id: id}});
  }

  pesquisar(): void {
    this.spinnerService.show();
    this.segmentoService.pesquisar(this.segmentoFilter)
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
    this.spinnerService.show();
    this.dialogService.confirm('Tem certeza que deseja inativar este segmento?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            let status = 'N';
            this.segmentoService.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `O registro foi inativado com sucesso.`
                });

                //ATUALIZANDO STATUS
                this.lista.forEach(function (value) {
                  if(value.idSegmento == id) {
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
    this.spinnerService.show();
    this.dialogService.confirm('Tem certeza que deseja ativar este segmento?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            let status = 'S';
            this.segmentoService.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `O registro foi ativado com sucesso.`
                });

                //ATUALIZANDO STATUS
                this.lista.forEach(function (value) {
                  if(value.idSegmento == id) {
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

  editar(id:string){
    this.router.navigate(['/segmento-form',id]);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    this.pager = this.pagerService.getPager(this.lista.length, page);
    this.pagedItems = this.lista.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
