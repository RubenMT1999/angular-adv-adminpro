import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {


  get token() : string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {headers: {'x-token': this.token}}
  }

  private transformarUsuarios(resultados: any[]): Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre, user.email,'', user.img, user.uid, user.role, user.google)
    );
  }

  constructor(private http: HttpClient) { }


  buscar(tipo: 'usuarios'|'medicos'|'hospitales', termino: string){
    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tipo}/${termino}`, this.headers)
            .pipe(
              map( (resp:any) => {
                switch(tipo){
                  case 'usuarios':
                    return this.transformarUsuarios(resp.resultados)
                  default:
                    return [];
                }
              })
            )
  }

}
