import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { TemplateComponent } from './template/template.component';
import { HomeComponent } from '../home/home.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

//COMPONENTS
import { CategoriaListComponent } from '../categoria/list/categoria-list.component';
import { CategoriaFormComponent } from '../categoria/form/categoria-form.component';
import { CategoriaViewComponent } from '../categoria/view/categoria-view.component';
import { SegmentoListComponent } from '../segmento/list/segmento-list.component';
import { SegmentoFormComponent } from '../segmento/form/segmento-form.component';
import { SegmentoViewComponent } from '../segmento/view/segmento-view.component';
import { EstabelecimentoListComponent } from '../estabelecimento/list/estabelecimento-list.component';
import { EstabelecimentoFormComponent } from '../estabelecimento/form/estabelecimento-form.component';
import { EstabelecimentoViewComponent } from '../estabelecimento/view/estabelecimento-view.component';
import { CartaoListComponent } from '../cartao/list/cartao-list.component';
import { CartaoFormComponent } from '../cartao/form/cartao-form.component';
import { CartaoViewComponent } from '../cartao/view/cartao-view.component';
import { DespesaListComponent } from '../despesa/list/despesa-list.component';
import { DespesaFormComponent } from '../despesa/form/despesa-form.component';
import { DespesaViewComponent } from '../despesa/view/despesa-view.component';

//SERVICES
import { CategoriaService } from '../../services/categoria/categoria.service';
import { SegmentoService } from '../../services/segmento/segmento.service';
import { EstabelecimentoService } from '../../services/estabelecimento/estabelecimento.service';
import { CartaoService } from '../../services/cartao/cartao.service';
import { DespesaService } from '../../services/despesa/despesa.service';

import { FormsModule } from '@angular/forms';
import { DialogService } from '../../dialog-service';
import { PagerService } from '../../services/page.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../security/auth.interceptor';
import { LoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import { CdtecSoNumberDirective } from '../../diretivas/cdtec-so-number.directive';




@NgModule({
    exports: [
      FooterComponent,
      MenuComponent,
      HeaderComponent,
      CommonModule
    ],
    imports: [
        RouterModule,
        FormsModule,
        HttpClientModule,
        LoadingModule,
        CommonModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        CurrencyMaskModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        FooterComponent,
        MenuComponent,
        HeaderComponent,
        HomeComponent,
        CategoriaListComponent,
        CategoriaFormComponent,
        CategoriaViewComponent,
        SegmentoListComponent,
        SegmentoFormComponent,
        SegmentoViewComponent,
        EstabelecimentoListComponent,
        EstabelecimentoFormComponent,
        EstabelecimentoViewComponent,
        CartaoListComponent,
        CartaoFormComponent,
        CartaoViewComponent,
        DespesaListComponent,
        DespesaFormComponent,
        DespesaViewComponent,
        CdtecSoNumberDirective
    ],
    providers: [
      DialogService,
      PagerService,
      CategoriaService,
      SegmentoService,
      CartaoService,
      EstabelecimentoService,
      DespesaService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ]
})
export class SharedModule { }
