import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../security/auth.guard';
import { CategoriaListComponent } from '../categoria/list/categoria-list.component';
import { CategoriaFormComponent } from '../categoria/form/categoria-form.component';

export const CONTENT_ROUTES: Routes = [

        { path : '', component: HomeComponent, canActivate: [AuthGuard] },
        { path : 'categoria-list', component: CategoriaListComponent, canActivate: [AuthGuard] },
        { path : 'categoria-form', component: CategoriaFormComponent, canActivate: [AuthGuard] }

]
