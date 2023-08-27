import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  cargarMenu(){
    //cargado en usuario service y lo cargamos en pages.component
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {titulo: 'Main', url: './'},
  //       {titulo: 'ProgressBar', url: './progress'},
  //       {titulo: 'Gráficas', url: './grafica1'},
  //     ]
  //   },

  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url: 'usuarios'},
  //       {titulo: 'Hospitales', url: 'hospitales'},
  //       {titulo: 'Médicos', url: 'medicos'},
  //     ]
  //   }
  // ];

  constructor() { }
}
