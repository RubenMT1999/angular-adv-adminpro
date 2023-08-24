import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Medico } from '../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  
  get token() : string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {headers: {'x-token': this.token}}
  }

  constructor(private http: HttpClient) { }


  cargarMedicos(): Observable<Medico[]> {
    return this.http.get<{ ok: boolean, medicos: Medico[] }>(`${base_url}/medicos`, { headers: {'x-token': localStorage.getItem('token') || ''} })
      .pipe(
        map((response: {ok:boolean, medicos: Medico[]}) => response.medicos) // Extraer el arreglo de hospitales de la respuesta
      );
  }


  crearMedico(medico: {nombre: string, hospital: string}) {
    return this.http.post(`${base_url}/medicos`, medico, this.headers) 
  }

  actualizarMedico(medico: Medico) {
    return this.http.put(`${base_url}/medicos/${medico._id}`, medico, this.headers)
  }

  borrarMedico(_id: string) {
    return this.http.delete(`${base_url}/medicos/${_id}`, this.headers)
  }


  obtenerMedicoPorId(id: string): Observable<Medico> {
    return this.http.get<{ ok: boolean, medico: Medico }>(`${base_url}/medicos/${id}`, this.headers)
      .pipe(
        map((response: { ok: boolean, medico: Medico }) => response.medico) // Cambiado 'medico' a 'medicos'
      );
  }
  

}
