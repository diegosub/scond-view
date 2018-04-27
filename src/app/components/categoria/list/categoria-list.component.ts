import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../dialog-service';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Categoria } from '../../../model/categoria';
import { Base } from '../../base/base';
import { ResponseApi } from '../../../model/response-api';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CategoriaViewComponent } from '../view/categoria-view.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { PagerService } from '../../../services/page.service';


@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})

export class CategoriaListComponent extends Base {

  categoriaFilter = new Categoria(null,'','','','','');

  constructor(private dialogService: DialogService,
              private route: ActivatedRoute,
              private router: Router,
              private pagerService: PagerService,
              private dialog: MatDialog,
              private spinnerService: Ng4LoadingSpinnerService,
              private categoriaService: CategoriaService) {
	  super();
  }

  ngOnInit() {
    this.categoriaFilter.fgAtivo = 'T';
    this.pesquisar();
  }

  visualizar(id) {
    this.dialog.open(CategoriaViewComponent, {height: '350px',
                                               width: '800px', data: {id: id}});
  }

  pesquisar(): void {
    this.spinnerService.show();
    this.categoriaService.pesquisar(this.categoriaFilter)
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
    this.dialogService.confirm('Tem certeza que deseja inativar esta categoria?')
      .then((candelete:boolean) => {
          if(candelete){
            this.spinnerService.show();
            this.message = {};
            let status = 'N';
            this.categoriaService.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `O registro foi inativado com sucesso.`
                });

                //ATUALIZANDO STATUS
                this.lista.forEach(function (value) {
                  if(value.idCategoria == id) {
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
    this.dialogService.confirm('Tem certeza que deseja ativar esta categoria?')
      .then((candelete:boolean) => {
          if(candelete){
            this.spinnerService.show();
            this.message = {};
            let status = 'S';
            this.categoriaService.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `O registro foi ativado com sucesso.`
                });

                //ATUALIZANDO STATUS
                this.lista.forEach(function (value) {
                  if(value.idCategoria == id) {
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
    this.router.navigate(['/categoria-form',id]);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    this.pager = this.pagerService.getPager(this.lista.length, page);
    this.pagedItems = this.lista.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
