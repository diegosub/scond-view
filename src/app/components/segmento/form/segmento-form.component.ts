import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Segmento } from '../../../model/segmento';
import { ResponseApi } from '../../../model/response-api';
import { SegmentoService } from '../../../services/segmento/segmento.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Base } from '../../base/base';
import { Location } from '@angular/common';
import { Categoria } from '../../../model/categoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';

@Component({
  selector: 'app-segmento-form',
  templateUrl: './segmento-form.component.html',
  styleUrls: ['./segmento-form.component.css']
})
export class SegmentoFormComponent extends Base {

  @ViewChild("form")
  form: NgForm;

  segmento = new Segmento(null,'',null,'','','','',null);

  listaCategoria = [];

  constructor(private route: ActivatedRoute,
              public router: Router,
              private _location: Location,
              private spinnerService: Ng4LoadingSpinnerService,
              private categoriaService: CategoriaService,
              private segmentoService: SegmentoService) {
        super(router);
  }

  ngOnInit() {
    let id : string = this.route.snapshot.params['id'];

    this.popularListaCategoria();
    this.segmento.idCategoria = '';

    if(id != undefined) {
      this.acao = 'Alterar';
      this.get(id);
    } else {
      this.acao = 'Cadastrar';
    }
  }

  //POPULAR LISTA DE CATEGORIAS ATIVAS
  popularListaCategoria() {
    this.spinnerService.show();
    let categoriaFilter = new Categoria(null, '','','','','');
    categoriaFilter.fgAtivo = 'S';
    this.categoriaService.pesquisar(categoriaFilter).subscribe((responseApi:ResponseApi) => {
        this.listaCategoria = responseApi['data'];
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
    this.segmentoService.get(id).subscribe((responseApi:ResponseApi) => {
      this.segmento = responseApi.data;
      this.spinnerService.hide();
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
      this.spinnerService.hide();
    });

  }

  //SALVAR SEGMENTO
  salvar(){
    this.spinnerService.show();
    this.message = {};
    this.segmentoService.createOrUpdate(this.segmento).subscribe((responseApi:ResponseApi) => {
        let segmento : Segmento = responseApi.data;
        if(this.route.snapshot.params['id'] == undefined) {
          this.segmento = new Segmento(null,'',null,'','','','',null);
          this.form.resetForm();
          this.segmento.idCategoria = '';
        }
        this.showMessage({
          type: 'success',
          text: `O segmento ${segmento.dsSegmento} foi salvo com sucesso!`
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
