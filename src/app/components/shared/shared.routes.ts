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
        { path : 'segmento-view/:id', component: SegmentoViewComponent, canActivate: [AuthGuard] }

]
