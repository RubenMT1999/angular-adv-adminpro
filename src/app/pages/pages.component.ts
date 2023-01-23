import { SettingsService } from './../services/settings.service';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Component, OnInit } from '@angular/core';

//para que lo reconozca y no nos de error
declare function customInitFunctions():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit{


  constructor(private settingsService: SettingsService){}

  ngOnInit() {
    //al hacer login, no se veía bien la aplicación porque debía cargar
    //el custom.js del index, el cual inicia los scripts de js de Jquery
    //por ello hacemos que ejecuta el método del custom.js situado en assets
    //al cargar el componente
    customInitFunctions();
  }

}
