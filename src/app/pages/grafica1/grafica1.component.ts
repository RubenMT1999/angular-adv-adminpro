import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  ventas: string = 'Ventas';
  labels1: string[] = [ 'Pan', 'Refresco', 'Patatas' ];
  valor: number[] = [400,100,100];

}
