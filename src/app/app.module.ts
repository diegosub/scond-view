import { UsuarioService } from './services/usuario/usuario.service';
import { TokenService } from './services/token/token.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthInterceptor } from './components/security/auth.interceptor';
import { AuthGuard } from './components/security/auth.guard';

import { AppComponent } from './app.component';

import { LoginComponent } from './components/security/login/login.component';
import { TemplateComponent } from './components/shared/template/template.component';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './components/shared/shared.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    UsuarioService,
    TokenService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
