import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../../../model/categoria';
import { ResponseApi } from '../../../model/response-api';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Base } from '../../base/base';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent extends Base {

  @ViewChild("form")
  form: NgForm;

  categoria = new Categoria(null,'');

  public loading = false;

  constructor(private route: ActivatedRoute,
              private spinnerService: Ng4LoadingSpinnerService,
              private categoriaService: CategoriaService) {
        super();
  }

  ngOnInit() {
    let id : string = this.route.snapshot.params['id'];

    if(id != undefined) {
      this.acao = 'Alterar';
    } else {
      this.acao = 'Cadastrar';
    }
  }

  //CADASTRAR CATEGORIA
  cadastrar(){
    this.spinnerService.show();
    this.message = {};
    this.categoriaService.createOrUpdate(this.categoria).subscribe((responseApi:ResponseApi) => {
        this.categoria = new Categoria(null,'');
        let categoria : Categoria = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Categoria ${categoria.dsCategoria} cadastrada com sucesso!`
        });
        this.spinnerService.hide();
    } , err => {
      this.showMessage({
        type: 'danger',
        text: err['error']['errors'][0]
      });
      this.spinnerService.hide();
    });
  }



}
