import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../dialog-service';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { ResponseApi } from '../../../model/response-api';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})

export class CategoriaListComponent implements OnInit {

  page:number=0;
  count:number=5;
  pages:Array<number>;
  message : {};
  classCss : {};
  listUser=[];

  constructor(
    private dialogService: DialogService,
    private categoriaService: CategoriaService,
    private router: Router) {

  }

  ngOnInit() {
    //this.findAll(this.page,this.count);
  }

  findAll(page:number,count:number){
    this.categoriaService.findAll(page,count).subscribe((responseApi:ResponseApi) => {
        this.listUser = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });

  }

  edit(id:string){
    this.router.navigate(['/user-new',id]);
  }

  // delete(id:string){
  //   this.dialogService.confirm('Do you want to delete the email ?')
  //     .then((candelete:boolean) => {
  //         if(candelete){
  //           this.message = {};
  //           this.categoriaService.delete(id).subscribe((responseApi:ResponseApi) => {
  //               this.showMessage({
  //                 type: 'success',
  //                 text: `Record deleted`
  //               });
  //               this.findAll(this.page,this.count);
  //           } , err => {
  //             this.showMessage({
  //               type: 'error',
  //               text: err['error']['errors'][0]
  //             });
  //           });
  //         }
  //     });
  // }

  setNextPage(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page =  this.page +1;
      this.findAll(this.page,this.count);
    }
  }

  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0){
      this.page =  this.page - 1;
      this.findAll(this.page,this.count);
    }
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.findAll(this.page,this.count);
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] =  true;
  }

}
