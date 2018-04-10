import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  public static instance: UtilService = null;

  constructor() {
    return UtilService.instance = UtilService.instance || this;
  }

  public static getInstance(){
    if(this.instance == null){
      this.instance = new UtilService();
    }
    return this.instance;
  }

  isLoggedIn():boolean {
    if(localStorage.getItem("usuario") == null){
      return false;
    } else {
      return true;
    }
  }

}
