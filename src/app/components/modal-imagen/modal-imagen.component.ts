import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
})
export class ModalImagenComponent {


  public imagenSubir: File;
  //imagen que se ve en el modal
  public imgTemp: any;

  constructor(public modalImagenService: ModalImagenService,
              public fileUploadService: FileUploadService){}



  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }


  cambiarImagen(file: File): any{

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'PNG'];
    const fileExtension = file.name.split('.').pop(); // Obtener la extensión del archivo

    if (!extensionesValidas.includes(fileExtension!)) {
      Swal.fire('Error', `El fichero no contiene una extensión válida (${extensionesValidas.join(', ')})`, 'error');
      return this.imgTemp = null;
    }

    if(!file){
      return this.imgTemp = null;
    }

    this.imagenSubir = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }


  subirImagen(){

    //id y tipo del usuario al que hemos hecho click en la imagen
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then( img => {
        if(img){
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
          //Para hacer el refresh. Hacemos el subscribe en el usuarios.components
          this.modalImagenService.nuevaImagen.emit(img);
          this.cerrarModal();
        }else{
          Swal.fire('Error','No se pudo cargar la imagen','error');
        }
      }).catch(err => {
          Swal.fire('Error',err.msg,'error');

      });
  }



}
