import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../security/auth.guard';
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

export const CONTENT_ROUTES: Routes = [

        { path : '', component: HomeComponent, canActivate: [AuthGuard] },

        //CATEGORA
        { path : 'categoria-list', component: CategoriaListComponent, canActivate: [AuthGuard] },
        { path : 'categoria-form', component: CategoriaFormComponent, canActivate: [AuthGuard] },
        { path : 'categoria-form/:id', component: CategoriaFormComponent, canActivate: [AuthGuard] },
        { path : 'categoria-view/:id', component: CategoriaViewComponent, canActivate: [AuthGuard] },

        //SEGMENTO
        { path : 'segmento-list', component: SegmentoListComponent, canActivate: [AuthGuard] },
        { path : 'segmento-form', component: SegmentoFormComponent, canActivate: [AuthGuard] },
        { path : 'segmento-form/:id', component: SegmentoFormComponent, canActivate: [AuthGuard] },
        { path : 'segmento-view/:id', component: SegmentoViewComponent, canActivate: [AuthGuard] },

        //SEGMENTO
        { path : 'estabelecimento-list', component: EstabelecimentoListComponent, canActivate: [AuthGuard] },
        { path : 'estabelecimento-form', component: EstabelecimentoFormComponent, canActivate: [AuthGuard] },
        { path : 'estabelecimento-form/:id', component: EstabelecimentoFormComponent, canActivate: [AuthGuard] },
        { path : 'estabelecimento-view/:id', component: EstabelecimentoViewComponent, canActivate: [AuthGuard] },

        //CARTAO
        { path : 'cartao-list', component: CartaoListComponent, canActivate: [AuthGuard] },
        { path : 'cartao-form', component: CartaoFormComponent, canActivate: [AuthGuard] },
        { path : 'cartao-form/:id', component: CartaoFormComponent, canActivate: [AuthGuard] },
        { path : 'cartao-view/:id', component: CartaoViewComponent, canActivate: [AuthGuard] },

        //DESPESA
        { path : 'despesa-list', component: DespesaListComponent, canActivate: [AuthGuard] },
        { path : 'despesa-form', component: DespesaFormComponent, canActivate: [AuthGuard] },
        { path : 'despesa-form/:id', component: DespesaFormComponent, canActivate: [AuthGuard] },
        { path : 'despesa-view/:id', component: DespesaViewComponent, canActivate: [AuthGuard] }

]
