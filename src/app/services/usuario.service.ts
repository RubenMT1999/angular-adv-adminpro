import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
              private router: Router) { }



  logout(){
    localStorage.removeItem('token');
    //Para que al hacer logout no se quede guardada la sugerencia de correo
    //para iniciar sesión con mi correo de Google.
    google.accounts.id.revoke('matiastiscar@gmail.com', () => {
      this.router.navigateByUrl('/login')
    })
  }


  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {headers: {'x-token': token}})
        .pipe(
          tap( (resp:any) => {
          localStorage.setItem('token', resp.token);
        }),
          map(resp => true),
          //obtiene el error que haya del flujo anterior y devuelve nu nuevo
          //observable False.
          catchError(error => of(false))
        );
  }


  crearUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData);
  }


  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap( (resp:any) => {
                    localStorage.setItem('token', resp.token)
                    return resp.usuario;
                  })
                );
  }

  loginGoogle(token: string){
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp:any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }


}
