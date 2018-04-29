import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseApi } from '../../../model/response-api';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Base } from '../../base/base';
import { Location } from '@angular/common';
import { Despesa } from '../../../model/despesa';
import { DespesaService } from '../../../services/despesa/despesa.service';
import { Segmento } from '../../../model/segmento';
import { SegmentoService } from '../../../services/segmento/segmento.service';
import { Estabelecimento } from '../../../model/estabelecimento';
import { EstabelecimentoService } from '../../../services/estabelecimento/estabelecimento.service';
import { Cartao } from '../../../model/cartao';
import { CartaoService } from '../../../services/cartao/cartao.service';

@Component({
  selector: 'app-despesa-form',
  templateUrl: './despesa-form.component.html',
  styleUrls: ['./despesa-form.component.css']
})
export class DespesaFormComponent extends Base {

  @ViewChild("form")
  form: NgForm;

  despesa = new Despesa(null,'','','','',null,null,null,null,'','','','','',null,null,null,null,'');
  listaSegmento = [];
  listaEstabelecimento = [];
  listaCartao = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _location: Location,
              private spinnerService: Ng4LoadingSpinnerService,
              private despesaService: DespesaService,
              private estabelecimentoService: EstabelecimentoService,
              private cartaoService: CartaoService,
              private segmentoService: SegmentoService) {
        super();
  }

  ngOnInit() {
    let id : string = this.route.snapshot.params['id'];

    this.popularListaSegmento();
    this.popularListaEstabelecimento();
    this.popularListaCartao();
    this.resetDespesa();

    if(id != undefined) {
      this.acao = 'Alterar';
      this.get(id);
    } else {
      this.acao = 'Cadastrar';
    }
  }

  resetDespesa() {
    this.despesa.idSegmento = '';
    this.despesa.fgCartao = 'S';
    this.despesa.dtCompra = new Date();
    this.despesa.vlMesCartao = new Date().getMonth()+1+"";
  }

  //POPULAR LISTA DE SEGMENTOS ATIVOS
  popularListaSegmento() {
    this.spinnerService.show();
    let segmentoFilter = new Segmento(null,'','','','','','',null);
    segmentoFilter.fgAtivo = 'S';
    this.segmentoService.pesquisar(segmentoFilter).subscribe((responseApi:ResponseApi) => {
        this.listaSegmento = responseApi['data'];
        this.spinnerService.hide();
    } , err => {
      this.showMessage({
        type: 'danger',
        text: err['error']['errors'][0]
      });
      this.spinnerService.hide();
    });
  }

  //POPULAR LISTA DE ESTABELECIMENTOS ATIVOS
  popularListaEstabelecimento() {
    this.spinnerService.show();
    let estabelecimentoFilter = new Estabelecimento(null,'','','','','');
    estabelecimentoFilter.fgAtivo = 'S';
    this.estabelecimentoService.pesquisar(estabelecimentoFilter).subscribe((responseApi:ResponseApi) => {
        this.listaEstabelecimento = responseApi['data'];
        this.spinnerService.hide();
    } , err => {
      this.showMessage({
        type: 'danger',
        text: err['error']['errors'][0]
      });
      this.spinnerService.hide();
    });
  }

  //POPULAR LISTA DE CARTOES ATIVOS
  popularListaCartao() {
    this.spinnerService.show();
    let cartaoFilter = new Cartao(null,'', '','','','');
    cartaoFilter.fgAtivo = 'S';
    this.cartaoService.pesquisar(cartaoFilter).subscribe((responseApi:ResponseApi) => {
        this.listaCartao = responseApi['data'];
        this.spinnerService.hide();
    } , err => {
      this.showMessage({
        type: 'danger',
        text: err['error']['errors'][0]
      });
      this.spinnerService.hide();
    });
  }

  get(id:string){
    this.spinnerService.show();
    this.despesaService.get(id).subscribe((responseApi:ResponseApi) => {
      this.despesa = responseApi.data;
      this.despesa.dtCompra = new Date(this.despesa.dtCompra);
      this.spinnerService.hide();
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
      this.spinnerService.hide();
    });
  }

  //SALVAR DESPESA
  salvar(){
    this.spinnerService.show();
    this.message = {};

    //VALIDAR CARTAO
    if(this.despesa.fgCartao == 'S' && this.despesa.idCartao == '') {
        this.showMessage({
          type: 'danger',
          text: `O campo Cartão é obrigatório.`
        });
        this.spinnerService.hide();
    } else {
        //GRAVAR
        this.despesaService.createOrUpdate(this.despesa).subscribe((responseApi:ResponseApi) => {
            let despesa : Despesa = responseApi.data;
            if(this.route.snapshot.params['id'] == undefined) {
              this.despesa = new Despesa(null,'','','','',null,null,null,null,'','','','','',null,null,null,null,'');
              this.resetDespesa();
            }
            this.showMessage({
              type: 'success',
              text: `A despesa ${despesa.idDespesa} foi salva com sucesso!`
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

  resetCartao() {
    this.despesa.vlMesCartao = new Date().getMonth()+1+"";
    this.despesa.idCartao = '';
  }

  cancelar() {
    this._location.back();
  }

}
