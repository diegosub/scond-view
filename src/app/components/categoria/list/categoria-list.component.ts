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

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})

export class CategoriaListComponent extends Base {

  categoriaFilter = new Categoria(null,'');
  listaCategoria=[];

  constructor(private dialogService: DialogService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private spinnerService: Ng4LoadingSpinnerService,
              private categoriaService: CategoriaService) {
	  super();
  }

  ngOnInit() {
    this.findAll(this.page,this.count);
  }

  visualizar(id) {
    this.dialog.open(CategoriaViewComponent, {height: '350px',
                                               width: '800px', data: {id: id}});
  }

  findAll(page:number,count:number){
    this.spinnerService.show();
    this.categoriaService.findAll(page,count).subscribe((responseApi:ResponseApi) => {
        this.listaCategoria = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
        this.spinnerService.hide();
    } , err => {
      super.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
      this.spinnerService.hide();
    });

  }

  inativar(id:string){
    this.spinnerService.show();
    this.dialogService.confirm('Tem certeza que deseja inativar esta categoria?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            let status = 'N';
            this.categoriaService.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `O registro foi inativado com sucesso.`
                });
                this.findAll(this.page,this.count);
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
    this.dialogService.confirm('Tem certeza que deseja ativar esta categoria?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            let status = 'S';
            this.categoriaService.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `O registro foi ativado com sucesso.`
                });
                this.findAll(this.page,this.count);
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

  setNextPage(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page =  this.page +1;
      this.findAll(this.page,this.count);
    }
  }

  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0){
      this.page =  this.page - 1;
      this.findAll(this.page,this.count);
    }
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.findAll(this.page,this.count);
  }

}
