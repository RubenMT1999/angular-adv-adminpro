import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
        {path:'login', component:LoginComponent},
        {path:'register', component:RegisterComponent},
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }