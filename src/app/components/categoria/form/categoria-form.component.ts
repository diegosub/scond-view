import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../../../model/categoria';
import { ResponseApi } from '../../../model/response-api';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  categoria = new Categoria(null,'');
  message : {};
  classCss : {};
  acao: string;

  public loading = false;

  constructor(private route: ActivatedRoute,
              private spinnerService: Ng4LoadingSpinnerService,
              private categoriaService: CategoriaService) {}

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

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  private showMessage(message: {type: string, text: string}): void {
      this.message = message;
      this.buildClasses(message.type);

  }

  private buildClasses(type: string): void {
     this.classCss = {
       'alert': true
     }
     this.classCss['alert-'+type] =  true;
  }

}
