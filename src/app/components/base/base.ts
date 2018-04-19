import { OnInit } from '@angular/core';
import { DialogService } from '../../dialog-service';
import { ActivatedRoute, Router } from '@angular/router';

export class Base implements OnInit {

  message : {};
  classCss : {};

  acao: string;

  lista = [];

  pager: any = {};
  pagedItems: any[];

  constructor() {}

  ngOnInit(): void {

  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'col-md-2' : true,
      'control-label' : true,
      //'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 5000);
  }

  buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] =  true;
  }

}
