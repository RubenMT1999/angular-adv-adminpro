import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router) { }

  get token() : string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.usuario.uid || '';
  }

  get headers(){
    return {headers: {'x-token': this.token}}
  }

  logout(){
    localStorage.removeItem('token');

    //verificamos que  API de Google Identity Toolkit de ha inicializado correctamente
    //de lo contrario el revoke nos puede dar error.
    google.accounts.id.initialize({
      client_id: "654622771453-jf22r6uopircg7fe0221dsd6kbjn5k60.apps.googleusercontent.com",
    });
    //Para que al hacer logout no se quede guardada la sugerencia de correo
    //para iniciar sesión con mi correo de Google.
    google.accounts.id.revoke('matiastiscar@gmail.com', () => {
      this.router.navigateByUrl('/login')
    })
  }

//Usando en el Guard
  validarToken(): Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`, this.headers)
        .pipe(
          map( (resp:any) => {
            const {email,google,nombre,role, img = '', uid} = resp.usuarioDB;
            this.usuario = new Usuario(nombre, email, '',img,uid,role,google);

            console.log(this.usuario);
            localStorage.setItem('token', resp.token);
            return true;
        }),
          //obtiene el error que haya del flujo anterior y devuelve nu nuevo
          //observable False.
          catchError(error => of(false))
        );
  }


  crearUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData);
  }


  actualizarPerfil( data: {email: string, nombre: string, role: string}){

    data = {
      ...data,
      role: this.usuario.role!
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
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

//Paginación
  cargarUsuarios(desde: number = 0){
    return this.http.get<CargarUsuario>(`${base_url}/usuarios?desde=${desde}`, this.headers)
            .pipe(
              map( resp => {
                  //Voy a convertir los usuarios de la respuesta que son de tipo Object a tipo Usuario
                  //Esto me ayudará a procesar las imagenes con el modelo de Usuario
                  const usuarios = resp.usuarios.map(
                  user => new Usuario(user.nombre, user.email,'', user.img, user.uid, user.role, user.google)
                  );

                return {
                  total: resp.total,
                  usuarios: usuarios
                };
              })
            )
  }


  eliminarUsuario(usuario: Usuario){
    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`, this.headers)
  }

  //Para cambiar el Role
  guardarUsuario( usuario: Usuario){
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }


}
