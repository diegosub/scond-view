import { OnInit } from '@angular/core';
import { DialogService } from '../../dialog-service';
import { ActivatedRoute, Router } from '@angular/router';

export class Base implements OnInit {

  page:number=0;
  count:number=5;
  pages:Array<number>;
  message : {};
  classCss : {};

  acao: string;

  constructor() {}

  ngOnInit(): void {
    
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
  }

  buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] =  true;
  }

}
