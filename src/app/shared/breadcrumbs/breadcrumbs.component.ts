import { ActivationEnd, Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router){
    this.tituloSubs$ = this.getArgumentosRuta()
                      //desestructuramos el dato que nos llega que sería {titulo: 'lo que sea'}
                      .subscribe( ({titulo}) => {
                        this.titulo = titulo;
                        document.title = `AdminPro - ${titulo}`;
                    });
  }

  //al hacer logout limpiamos el subscribe
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){
    //Hemos definido un dato en el router del pages, el cual es el título de la 
    //página. Para obtener el dato usamos el router.events el cual devuelve un
    //observable. Al suscribirnos nos devuelve un conjunto de objetos entre los cuales
    //debemos filtrar hasta obtener el título, que se encuentra en el objeto 
    //ActivationEnd de la ruta hija.
    return this.router.events
    .pipe(
      filter( (event: any) => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data ),
    );

  }



}
