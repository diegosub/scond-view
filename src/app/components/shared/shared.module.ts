import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { TemplateComponent } from './template/template.component';
import { HomeComponent } from '../home/home.component';
import { CategoriaListComponent } from '../categoria/list/categoria-list.component';
import { CategoriaFormComponent } from '../categoria/form/categoria-form.component';
import { CategoriaViewComponent } from '../categoria/view/categoria-view.component';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../dialog-service';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { PagerService } from '../../services/page.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../security/auth.interceptor';
import { LoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';



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
        MatDialogModule
    ],
    declarations: [
        FooterComponent,
        MenuComponent,
        HeaderComponent,
        HomeComponent,
        CategoriaListComponent,
        CategoriaFormComponent,
        CategoriaViewComponent
    ],
    providers: [
      DialogService,
      PagerService,
      CategoriaService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ]
})
export class SharedModule { }
