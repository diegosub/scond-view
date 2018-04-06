import { CurrentUser } from './../../../model/current-user';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { SharedService } from './../../../services/shared.service';
import { Usuario } from './../../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario(null,'','','','');
  shared: SharedService;
  message: string;

  constructor(private usuarioService: UsuarioService, 
              private router: Router){
    this.shared = SharedService.getInstance();  
  }

  login(){    
    this.message = '';
    this.usuarioService.login(this.usuario).subscribe((userAuthentication: CurrentUser) => {
        this.shared.token = userAuthentication.token;
        this.shared.usuario = userAuthentication.usuario;
        this.shared.usuario.dsPerfil = this.shared.usuario.dsPerfil.substring(5);
        this.shared.showTemplate.emit(true);
        this.router.navigate(['/']);
    } , err => {
      this.shared.token = null;
      this.shared.usuario = null;
      this.shared.showTemplate.emit(false);
      this.message = 'Não foi possivel entrar no sistema. Verifique suas credenciais e tente novamente. ';
    });
  }

  cancelLogin(){
    this.message = '';
    this.usuario = new Usuario(null, '','','','');
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }


  ngOnInit() {
  }

}
