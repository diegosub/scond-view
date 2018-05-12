import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseApi } from '../../../model/response-api';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Base } from '../../base/base';
import { Location } from '@angular/common';
import { Cartao } from '../../../model/cartao';
import { CartaoService } from '../../../services/cartao/cartao.service';

@Component({
  selector: 'app-cartao-form',
  templateUrl: './cartao-form.component.html',
  styleUrls: ['./cartao-form.component.css']
})
export class CartaoFormComponent extends Base {

  @ViewChild("form")
  form: NgForm;

  cartao = new Cartao(null,'', '','','','');

  constructor(private route: ActivatedRoute,
              public router: Router,
              private _location: Location,
              private spinnerService: Ng4LoadingSpinnerService,
              private cartaoService: CartaoService) {
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
    this.cartaoService.get(id).subscribe((responseApi:ResponseApi) => {
      this.cartao = responseApi.data;
      this.spinnerService.hide();
    } , err => {
      this.spinnerService.hide();
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  //SALVAR CARTAO
  salvar(){
    this.spinnerService.show();
    this.message = {};
    this.cartaoService.createOrUpdate(this.cartao).subscribe((responseApi:ResponseApi) => {
        let cartao : Cartao = responseApi.data;
        if(this.route.snapshot.params['id'] == undefined) {
          this.cartao = new Cartao(null,'','','','','');
          this.form.resetForm();
        }
        this.showMessage({
          type: 'success',
          text: `O cartão ${cartao.dsCartao} foi salvo com sucesso!`
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
