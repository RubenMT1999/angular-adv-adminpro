import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  /* Si queremos solo poner el btn-info por ejemplo sin tener que poner btn
  /* ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  } */
  
  //Con input ya sabe que podemos recibir una propiedad desde el padre llamada progreso
  @Input() progreso: number = 40;
  @Input() btnClass: string = 'btn btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  get getPorcentaje(){
    return `${this.progreso}%`;
  }

  cambiarValor( valor: number ){

    if(this.progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      this.progreso = 100;
      return
    }

    if(this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0);
      this.progreso = 0;
      return
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }


  //cuando haya algun cambio en el input se ejecuta esto y nos devuelve
  //el valor que hay en el input
  onChange( nuevoValor: number ){

    if(nuevoValor >=100){
      this.progreso = 100;
    }else if(nuevoValor <= 0){
      this.progreso = 0;
    }else{
      this.progreso = nuevoValor;
    }

    this.valorSalida.emit( this.progreso );

  }

}
