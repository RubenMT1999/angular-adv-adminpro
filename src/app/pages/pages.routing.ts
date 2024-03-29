
import { AuthGuard } from '../guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';


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
          {path:'buscar/:termino', component:BusquedaComponent, data:{ titulo: 'Busquedas' }},

          // Mantenimientos
          {path:'hospitales', component:HospitalesComponent, data:{ titulo: 'Mantenimiento de Hospitales' }},
          {path:'medicos', component:MedicosComponent, data:{ titulo: 'Mantenimiento de Médicos' }},
          {path:'medico/:id', component:MedicoComponent, data:{ titulo: 'Mantenimiento de Médicos' }},

          //Rutas de Admin
          {path:'usuarios', canActivate: [AdminGuard], component:UsuariosComponent, data:{ titulo: 'Mantenimiento de Usuarios' }},
        ]
    },
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
