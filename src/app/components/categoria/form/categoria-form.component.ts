import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../../model/categoria';
import { ResponseApi } from '../../../model/response-api';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Base } from '../../base/base';
import {Location} from '@angular/common';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent extends Base {

  @ViewChild("form")
  form: NgForm;

  categoria = new Categoria(null,'', '','','','');

  constructor(private route: ActivatedRoute,
              public router: Router,
              private _location: Location,
              private spinnerService: Ng4LoadingSpinnerService,
              private categoriaService: CategoriaService) {
        super(router);
  }

  ngOnInit() {
    let id : string = this.route.snapshot.params['id'];

    if(id != undefined) {
      this.acao = 'Alterar';
      this.get(id);
    } else {
      this.acao = 'Cadastrar';
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

  //SALVAR CATEGORIA
  salvar(){
    this.spinnerService.show();
    this.message = {};
    this.categoriaService.createOrUpdate(this.categoria).subscribe((responseApi:ResponseApi) => {
        let categoria : Categoria = responseApi.data;
        if(this.route.snapshot.params['id'] == undefined) {
          this.categoria = new Categoria(null,'','','','','');
          this.form.resetForm();
        }
        this.showMessage({
          type: 'success',
          text: `A categoria ${categoria.dsCategoria} foi salva com sucesso!`
        });
        this.spinnerService.hide();
    } , err => {
      this.spinnerService.hide();
      this.showMessage({
        type: 'danger',
        text: err['error']['errors'][0]
      });      
    });
  }

  cancelar() {
    this._location.back();
  }

}
