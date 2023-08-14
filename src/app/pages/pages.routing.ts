import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          {path:'', component:DashboardComponent, data:{ titulo: 'Dashboard' }},
          {path:'progress', component:ProgressComponent, data:{ titulo: 'ProgressBar' }},
          {path:'perfil', component:PerfilComponent, data:{ titulo: 'Perfil de usuario' }},
          {path:'grafica1', component:Grafica1Component, data:{ titulo: 'Gráfica' }},
          {path:'account-settings', component:AccountSettingsComponent, data:{ titulo: 'Ajustes de Cuenta' }},
        ]
    },
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
