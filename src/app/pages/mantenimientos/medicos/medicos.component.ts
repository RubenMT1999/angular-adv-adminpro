import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
})
export class MedicosComponent implements OnInit, OnDestroy{

  public cargando: boolean = true;
  public medicos: Medico[] = [];

  private imgSubs: Subscription;

  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService){}


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(delay(100)).subscribe(img => this.cargarMedicos());
  }


  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
      })
  }


  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img);
  }


  buscar(termino: string){

    if(termino.length === 0){
      this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos', termino)
        .subscribe(resp => {
          this.medicos = resp;
        });
  }


  borrarMedico(medico: Medico){
    //Evitar que se elimine a sí mismo
    // if(medico._id === this.usuarioService.uid){
    //   return Swal.fire('Error','No puede eliminarse a sí mismo','error');
    // }

    Swal.fire({
      title: '¿Borrar médico?',
      text: `Está a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id!)
            .subscribe(resp => {
              Swal.fire(
                'Médico eliminado',
                `${medico.nombre} fue eliminado correctamente`,
                'success'
              );
              this.ngOnInit();
            });
      }
    })
  }

}
