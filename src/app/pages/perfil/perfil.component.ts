import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit{


  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService){
                this.usuario = usuarioService.usuario;
              }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    })
  }


  actualizarPerfil(){
    console.log(this.perfilForm.value);
    console.log(this.usuarioService.uid);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe( () => {
        const {nombre, email} = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
      }, (err) => {
        console.log(err);
        Swal.fire('Error',err.error.message,'error');
      });
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
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
      .then( img => {
        if(img){
          this.usuario.img = img;
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        }else{
          Swal.fire('Error','No se pudo cargar la imagen','error');
        }
      }).catch(err => {
        Swal.fire('Error',err.msg,'error');

      });
  }

}
