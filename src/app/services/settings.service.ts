import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //estamos cogiendo el link del index con id=theme el cual se encarga
  //de establecer el theme color de la pagina
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css' ;
    this.linkTheme?.setAttribute('href',url);
   }


   changeTheme(theme: string){

    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme',url);

    this.checkCurrentTheme();
  }


  checkCurrentTheme(){

      //obtenemos una lista de todos los elementos html con esta clase selector
    const links = document.querySelectorAll('.selector');

    //para cada elemento html de la lista:
    links.forEach(elem =>{

      //si hay alguna propiedad con la clase working la elimina
      //working hace que aparezca el check de que está activo
      elem.classList.remove('working');
      //obtenemos el valor de su atributo data-theme
      const btnTheme = elem.getAttribute('data-theme');

      //comparamos el href que tiene actualmente el theme de nuestro index
      //y vemos si coincide con el theme de nuestro elemento
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(btnThemeUrl === currentTheme){
        elem.classList.add('working');
      }

    })
  }

}
