import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estabelecimento } from '../../../model/estabelecimento';
import { ResponseApi } from '../../../model/response-api';
import { EstabelecimentoService } from '../../../services/estabelecimento/estabelecimento.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Base } from '../../base/base';
import { Location } from '@angular/common';

@Component({
  selector: 'app-estabelecimento-form',
  templateUrl: './estabelecimento-form.component.html',
  styleUrls: ['./estabelecimento-form.component.css']
})
export class EstabelecimentoFormComponent extends Base {

  @ViewChild("form")
  form: NgForm;

  estabelecimento = new Estabelecimento(null,'', '','','','');

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _location: Location,
              private spinnerService: Ng4LoadingSpinnerService,
              private estabelecimentoService: EstabelecimentoService) {
        super();
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
    this.estabelecimentoService.get(id).subscribe((responseApi:ResponseApi) => {
      this.estabelecimento = responseApi.data;
      this.spinnerService.hide();
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
      this.spinnerService.hide();
    });
  }

  //SALVAR ESTABELECIMENTO
  salvar(){
    this.spinnerService.show();
    this.message = {};
    this.estabelecimentoService.createOrUpdate(this.estabelecimento).subscribe((responseApi:ResponseApi) => {
        let estabelecimento : Estabelecimento = responseApi.data;
        if(this.route.snapshot.params['id'] == undefined) {
          this.estabelecimento = new Estabelecimento(null,'','','','','');
          this.form.resetForm();
        }
        this.showMessage({
          type: 'success',
          text: `O estabelecimento ${estabelecimento.dsEstabelecimento} foi salvo com sucesso!`
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

  cancelar() {
    this._location.back();
  }

}
