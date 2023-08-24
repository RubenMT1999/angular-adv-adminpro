import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  //Los Pipes transforman de forma visual los datos.


  transform(img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    
    if(!img){
      return `${base_url}/upload/usuarios/no-image`
  //si la imagen proviene de google https
  }else if(img?.includes('https')){
      return img;
  }else if(img){
      return `${base_url}/upload/${tipo}/${img}`;
  }else{
      return `${base_url}/upload/usuarios/no-image`
  }

  }

}
