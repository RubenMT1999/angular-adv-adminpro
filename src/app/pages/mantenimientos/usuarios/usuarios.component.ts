import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit, OnDestroy{


  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public imgSubs: Subscription;

  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService){}


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  get usuarioLogeado():Usuario {
    return this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(delay(100)).subscribe(img => this.cargarUsuarios());
  }


  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ({total, usuarios}) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
    });
  }


  cambiarPagina( valor: number ){
    this.desde += valor;

    //No bajará de los 0 usuarios ni será superior al total de usuarios
    if(this.desde < 0 ){
      this.desde = 0;
    } else if(this.desde >= this.totalUsuarios){
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }


  buscar(termino: string){

    if(termino.length === 0){
      this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', termino)
        .subscribe(resp => {
          this.usuarios = resp;
        });
  }


  eliminarUsuario(usuario: Usuario):any{

    //Evitar que se elimine a sí mismo
    if(usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error','No puede eliminarse a sí mismo','error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
            .subscribe(resp => {
              Swal.fire(
                'Usuario eliminado',
                `${usuario.nombre} fue eliminado correctamente`,
                'success'
              );
              this.ngOnInit();
            });
      }
    })
  }


  cambiarRole(usuario: Usuario){
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {

      })
  }
  

  abrirModal(usuario: Usuario){
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }

}
