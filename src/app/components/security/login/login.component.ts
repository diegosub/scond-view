import { CurrentUser } from './../../../model/current-user';
import { UsuarioService } from './../../../services/usuario/usuario.service';
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
  message: string;

  constructor(private usuarioService: UsuarioService,
              private router: Router){      
  }

  login(){
    this.message = '';
    this.usuarioService.login(this.usuario)
      .subscribe((userAuthentication: CurrentUser) => {
          localStorage.setItem("usuario", JSON.stringify(userAuthentication.usuario));
          localStorage.setItem("token", userAuthentication.token);
          this.router.navigate(['/']);
      } , err => {
          localStorage.removeItem("usuario");
          localStorage.removeItem("token");
          this.message = 'Não foi possivel entrar no sistema. Verifique suas credenciais e tente novamente. ';
      });
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
